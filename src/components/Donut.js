import React from 'react';
import '../css/Donut.css'

function Donut(props) {
  const {
    DONUT_FROSTING_COVERAGE,
    DONUT_FROSTING_THICKNESS,
    DONUT_SPRINKLE_COVERAGE,
    DONUT_INNER_RADIUS,
    DONUT_OUTER_RADIUS,
  } = props;

  const innerRadius = DONUT_INNER_RADIUS * 50;
  const outerRadius = DONUT_OUTER_RADIUS * 50;
  const frostRadius = (outerRadius + innerRadius) / 2;
  const frostStrokeWidth = (outerRadius - innerRadius) * DONUT_FROSTING_COVERAGE;

  return (
    <div className="Donut">
      <svg viewBox="0 0 100 100">
        <circle cx={50} cy={50} r={outerRadius} fill="#efcc9a" stroke="#20426a" strokeWidth="2" />
        <circle cx={50} cy={50} r={innerRadius} fill="white" stroke="#20426a" strokeWidth="2" />
        <circle
          cx={50}
          cy={50}
          fill="transparent"
          opacity={DONUT_FROSTING_THICKNESS}
          r={frostRadius}
          stroke="#f288a9"
          strokeWidth={frostStrokeWidth}
        />
      </svg>
    </div>
  );
}

Donut.SPRINKLE_COLORS = [
  '#EFE578',
  '#B7E5CF',
  '#FFFFFF',
  '#F8CACD',
  '#1ACFE2',
];

export default Donut;
