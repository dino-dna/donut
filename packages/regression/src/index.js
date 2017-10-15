'use strict'

const execa = require('execa')
const debug = require('debug')('regression')

/**
 * - it has a model
 * - it takes donuts
 * - it outputs a { model, donut }
 */
async function regression (donuts, image) {
  var Xm = {
    DONUT_FROSTING_COVERAGE: [],
    DONUT_FROSTING_THICKNESS: [],
    DONUT_SPRINKLE_COVERAGE: [],
    DONUT_INNER_RADIUS: [],
    DONUT_OUTER_RADIUS: []
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
  const child = execa('docker', [ 'run', '-i', '--rm', image || 'donut-regression' ])
  // await bb.delay(1000)
  child.stdin.write(JSON.stringify({ X: Xn, Y, learners: ['ridge_regression'] }))
  child.stdin.end()
  const res = await child
  const coefficients = JSON.parse(res.stdout.toString())
  debug(coefficients)
  return coefficients
}

module.exports = regression
