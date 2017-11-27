'use strict'

var gaussian = require('gaussian')
var distribution = gaussian(0.3, 0.06)

function rateRadius (outer, inner) {
  var probability = distribution.cdf(inner / outer)
  return probability < 0.5
    ? 2 * probability
    : 0.5 * (1 - probability)
}

function rateThickness (val) {
  if (val >= 0.5) {
    return -2 * val + 2
  }
  return 2 * val
}

/**
 * Get donut indicator
 *
 * @param {Object} donut
 * @returns {number} Indicator rating donut quality
 */
function getIndicator (donut) {
  var DONUT_FROSTING_COVERAGE = donut.DONUT_FROSTING_COVERAGE
  var DONUT_FROSTING_THICKNESS = donut.DONUT_FROSTING_THICKNESS
  var DONUT_SPRINKLE_COVERAGE = donut.DONUT_SPRINKLE_COVERAGE
  var DONUT_INNER_RADIUS = donut.DONUT_INNER_RADIUS
  var DONUT_OUTER_RADIUS = donut.DONUT_OUTER_RADIUS

  return 0.4 * DONUT_FROSTING_COVERAGE +
    0.3 * rateThickness(DONUT_FROSTING_THICKNESS) +
    0.15 * rateRadius(DONUT_OUTER_RADIUS, DONUT_INNER_RADIUS) +
    0.15 * DONUT_SPRINKLE_COVERAGE
}

function getIndicatorParams (donut) {
  var DONUT_FROSTING_COVERAGE = donut.DONUT_FROSTING_COVERAGE
  var DONUT_FROSTING_THICKNESS = donut.DONUT_FROSTING_THICKNESS
  var DONUT_SPRINKLE_COVERAGE = donut.DONUT_SPRINKLE_COVERAGE
  var DONUT_INNER_RADIUS = donut.DONUT_INNER_RADIUS
  var DONUT_OUTER_RADIUS = donut.DONUT_OUTER_RADIUS

  return {
    frostingCoverage: DONUT_FROSTING_COVERAGE,
    frostingThickness: rateThickness(DONUT_FROSTING_THICKNESS),
    radius: rateRadius(DONUT_OUTER_RADIUS, DONUT_INNER_RADIUS),
    sprinkleCoverage: DONUT_SPRINKLE_COVERAGE
  }
}

// es5 for common lib usage
module.exports = {
  rateRadius: rateRadius,
  rateThickness: rateThickness,
  getIndicator: getIndicator,
  getIndicatorParams: getIndicatorParams
}
