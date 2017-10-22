import React from 'react'
import { getIndicator, getIndicatorParams } from 'donut-common/src/rater'

function getEmoji(val) {
  if (val > 0.9) {
    return <span aria-label='good' role='img'>😎</span>;
  } else if (val > 0.8) {
    return <span aria-label='okay' role='img'>😐</span>;
  }
  return <span aria-label='bad' role='img'>😱</span>
}

export default function Rating (props) {
  const indicator = getIndicator(props);
  const {
    frostingCoverage,
    frostingThickness,
    radius,
    sprinkleCoverage
  } = getIndicatorParams(props);

  return (
    <dl>
      <dt>Overall:</dt>
      <dd>{getEmoji(indicator)}</dd>

      <dt>Frosting coverage:</dt>
      <dd>{getEmoji(frostingCoverage)}</dd>

      <dt>Frosting thickness:</dt>
      <dd>{getEmoji(frostingThickness)}</dd>

      <dt>Radius:</dt>
      <dd>{getEmoji(radius)}</dd>
      <dt>Sprinkles:</dt>
      <dd>{getEmoji(sprinkleCoverage)}</dd>
    </dl>
  );
}
