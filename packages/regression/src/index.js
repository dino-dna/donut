'use strict'

const execa = require('execa')
const debug = require('debug')('donut:regression')
const { keys } = require('donut-common')

/**
 * Runs a donut regression
 * @param {Donut[]} donuts
 * @param {string} image docker image
 * @returns {Promise} resolves to regression coefficients
 */
async function regression (donuts, image) {
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
  const child = execa(
    'docker',
    [ 'run', '-i', '--rm', image || 'donut-regression' ]
  )
  child.stdin.write(
    JSON.stringify({
      X: Xn,
      Y,
      learners: ['ridge_regression_with_sim_ann']
    })
  )
  child.stdin.end()
  const res = await child
  debug(`regression logs: ${res.stderr}`)
  const report = JSON.parse(res.stdout.toString())
  // transform X_min to donut POJO
  for (var algoName in report) {
    var algoRes = report[algoName]
    algoRes.donut = keys.reduce((donut, key, i) => {
      return Object.assign(donut, { [key]: report[algoName].X_min[i] })
    }, {})
  }
  debug(`regression report: ${report}`)
  return report
}

module.exports = regression
