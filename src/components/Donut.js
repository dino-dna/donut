import React, { Component } from 'react';
import '../css/Donut.css'

export default class Donut extends Component {
  render() {
    // All props between 0..1
    const {
      DONUT_FROSTING_COVERAGE = .55,
      DONUT_FROSTING_THICKNESS = 1,
      DONUT_SPRINKLE_COVERAGE = .75,
      DONUT_INNER_RADIUS = .15,
      DONUT_OUTER_RADIUS = .75,
    } = this.props;

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
}
