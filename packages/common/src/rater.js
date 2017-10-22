'use strict'

const gaussian = require('gaussian')
const distribution = gaussian(0.3, 0.06)

function rateRadius(outer, inner) {
  const probability = distribution.cdf(inner / outer)
  return probability < 0.5 ?
    2 * probability :
    0.5 * (1 - probability)
}

function rateThickness(val) {
  if (val >= 0.5) {
    return -2 * val + 2
  }
  return 2 * val
}

/**
 * @param {Object} donut
 * @returns {Object}
 */
function getIndicator({
  DONUT_FROSTING_COVERAGE,
  DONUT_FROSTING_THICKNESS,
  DONUT_SPRINKLE_COVERAGE,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
}) {
  return .6 * DONUT_FROSTING_COVERAGE +
    .3 * rateThickness(DONUT_FROSTING_THICKNESS) +
    .05 * rateRadius(DONUT_OUTER_RADIUS, DONUT_INNER_RADIUS) +
    .05 * DONUT_SPRINKLE_COVERAGE
}

function getIndicatorParams({
  DONUT_FROSTING_COVERAGE,
  DONUT_FROSTING_THICKNESS,
  DONUT_SPRINKLE_COVERAGE,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
}) {
  return {
    frostingCoverage: DONUT_FROSTING_COVERAGE,
    frostingThickness: rateThickness(DONUT_FROSTING_THICKNESS),
    radius: rateRadius(DONUT_OUTER_RADIUS, DONUT_INNER_RADIUS),
    sprinkleCoverage: DONUT_SPRINKLE_COVERAGE,
  }
}

// es5 for common lib usage
module.exports = {
  rateRadius,
  rateThickness,
  getIndicator,
  getIndicatorParams
}
