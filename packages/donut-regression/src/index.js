'use strict'

const regression = require('@smockle/regression')

/**
 * - it has a model
 * - it takes donuts
 * - it outputs a { model, donut }
 */
function solve (donuts) {
  var Xm = {
    DONUT_FROSTING_COVERAGE: [],
    DONUT_FROSTING_THICKNESS: [],
    DONUT_SPRINKLE_COVERAGE: [],
    DONUT_INNER_RADIUS: [],
    DONUT_OUTER_RADIUS: []
  }
  var Y = []
  for (var key in donuts) {
    var donut = donuts[key]
    Xm.DONUT_FROSTING_COVERAGE.push(donut['DONUT_FROSTING_COVERAGE'])
    Xm.DONUT_FROSTING_THICKNESS.push(donut['DONUT_FROSTING_THICKNESS'])
    Xm.DONUT_SPRINKLE_COVERAGE.push(donut['DONUT_SPRINKLE_COVERAGE'])
    Xm.DONUT_INNER_RADIUS.push(donut['DONUT_INNER_RADIUS'])
    Xm.DONUT_OUTER_RADIUS.push(donut['DONUT_OUTER_RADIUS'])
    Y.push(donut['DONUT_RATING'])
  }

  var X = [
    Xm.DONUT_FROSTING_COVERAGE,
    Xm.DONUT_FROSTING_THICKNESS,
    Xm.DONUT_SPRINKLE_COVERAGE,
    Xm.DONUT_INNER_RADIUS,
    Xm.DONUT_OUTER_RADIUS
  ]
  var r = regression(X, Y)
  console.log(r)
  return r
}

module.exports = solve
