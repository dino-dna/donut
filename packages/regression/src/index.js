'use strict'

const debug = require('debug')('donut:regression')
const { keys } = require('donut-common')
const Docker = require('dockerode')
const concat = require('concat-stream')
const bluebird = require('bluebird')
const docker = new Docker()

/**
 * Runs a donut regression
 * @param {Donut[]} donuts
 * @returns {Promise} resolves to regression coefficients
 */
async function regression (donuts) {
  var Xm = {}
  for (var i in keys) {
    Xm[keys[i]] = []
  }
  var Xn = []
  var Y = []
  for (var index in donuts) {
    var donut = donuts[index]
    var record = []
    for (var attr in Xm) {
      if (attr in donut) record.push(donut[attr])
      else throw new Error(`donut missing attribute: ${attr}`)
    }
    Xn.push(record)
    if (!('DONUT_RATING' in donut)) throw new Error('missing attribute DONUT_RATING')
    Y.push(donut['DONUT_RATING'])
  }
  const serializedInput = JSON.stringify({
    X: Xn,
    Y,
    learners: ['ridge_regression_with_sim_ann']
  })
  let res

  function captureRegressionStdout (stdoutString) {
    debug('handling regression output')
    res = `${stdoutString}`
  }

  debug('building regression container')
  docker.createContainer({
    Image: 'cdaringe/donut-regression',
    CapDrop: ['ALL'],
    AttachStdin: true,
    Privileged: false,
    Tty: false,
    OpenStdin: true,
    StdinOnce: true,
    Env: [
      `DEBUG=${process.env.DEBUG}`
    ]
  }, function (err, container) {
    if (err) throw err
    container.attach({ hijack: true, stream: true, stdin: true, stdout: true, stderr: true }, function (err, stream) {
      if (err) throw err
      const concatter = concat(captureRegressionStdout)
      container.modem.demuxStream(stream, concatter, process.stderr) // concat(captureRegressionStdout), process.stderr)
      container.start(async function (err, data) {
        if (err) throw err
        debug('piping data into regression container')
        stream.write(`${serializedInput}`)
        stream.end()
        await container.wait()
        bluebird.delay(50)
        concatter.end()
      })
    })
  })

  while (!res) { // eslint-disable-line
    debug('awaiting container results')
    await bluebird.delay(500)
  }
  const report = JSON.parse(res)
  for (var algoName in report) {
    var algoRes = report[algoName]
    algoRes.donut = keys.reduce((donut, key, i) => {
      return Object.assign(donut, { [key]: report[algoName].X_min[i] })
    }, {})
  }
  return report
}

module.exports = regression
