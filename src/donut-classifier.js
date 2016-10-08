// 0, 0
// .5, 1
// 1, 0
function rateThickness(val) {
  if (val >= 0.5) {
    return -2 * val + 2;
  }
  return 2 * val;
}

/**
 * @param {Object} donut
 */
export default function donutClassifier({
  DONUT_FROSTING_COVERAGE,
  DONUT_FROSTING_THICKNESS,
  DONUT_SPRINKLE_COVERAGE,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
}) {
  return .6 * DONUT_FROSTING_COVERAGE +
    .3 * rateThickness(DONUT_FROSTING_THICKNESS) +
    .05 * DONUT_SPRINKLE_COVERAGE +
    .05 * (DONUT_OUTER_RADIUS - DONUT_INNER_RADIUS);
}

