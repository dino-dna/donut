import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../css/Donut.css'
import { getIndicator, getIndicatorParams } from '../donut-classifier'

export default class Donut extends Component {
  constructor(props) {
    super(props);
    this.renderSprinkles = this.renderSprinkles.bind(this);
  }

  renderSprinkles(frostingRadius) {
    const {
      DONUT_FROSTING_COVERAGE,
      DONUT_FROSTING_THICKNESS,
      DONUT_SPRINKLE_COVERAGE,
    } = this.props;
    const MAX_SPRINKLE_COUNT = 100;
    const sprinkles = [];


    for (let i = 0, il = Math.round(DONUT_SPRINKLE_COVERAGE * MAX_SPRINKLE_COUNT); i < il; i++) {
      sprinkles.push([
        Math.sin(i / il * Math.PI * 2) * -1 * frostingRadius * 2, // x
        Math.cos(i / il * Math.PI * 2) * frostingRadius * 2, // y
        360 / il * i + 90, // rotation
      ]);
    }

    return (
      <g transform="translate(50, 50) scale(0.5)">
        {sprinkles.map(([x, y, rotation], index) =>{
          const scale = 0.125;
          const length = 60 * scale;
          const height = 20 * scale;
          return (
            <path
              key={index}
              d="M10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 L50,20 C55.5228475,20 60,15.5228475 60,10 C60,4.4771525 55.5228475,0 50,0 L10,0 Z"
              fill={Donut.SPRINKLE_COLORS[index % 5]}
              transform={`translate(${x - length},${y - height}) scale(${scale}) rotate(${rotation})`}
            ></path>
          );
        })}
      </g>
    );
  }

  static getEmoji(val) {
    if (val > .9) {
      return '😎';
    } else if (val > .8) {
      return '😐';
    }

    return '😱';
  }

  renderRating() {
    const indicator = getIndicator(this.props);
    const {
      frostingCoverage,
      frostingThickness,
      radius,
      sprinkleCoverage
    } = getIndicatorParams(this.props);

    return (
      <dl>
        <dt>Overall:</dt>
        <dd>{Donut.getEmoji(indicator)}</dd>

        <dt>Frosting coverage:</dt>
        <dd>{Donut.getEmoji(frostingCoverage)}</dd>

        <dt>Frosting thickness:</dt>
        <dd>{Donut.getEmoji(frostingThickness)}</dd>

        <dt>Radius:</dt>
        <dd>{Donut.getEmoji(radius)}</dd>
        <dt>Sprinkles:</dt>
        <dd>{Donut.getEmoji(sprinkleCoverage)}</dd>
      </dl>
    );
  }

  render() {
    const {
      DONUT_FROSTING_COVERAGE,
      DONUT_FROSTING_THICKNESS,
      DONUT_INNER_RADIUS,
      DONUT_OUTER_RADIUS,
    } = this.props;

    console.log(this.props);

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
            strokeWidth={frostStrokeWidth} />
          {this.renderSprinkles(frostRadius)}
        </svg>
        {this.renderRating()}
      </div>
    );
  }
}

Donut.SPRINKLE_COLORS = [
  '#EFE578',
  '#B7E5CF',
  '#FFFFFF',
  '#F8CACD',
  '#1ACFE2',
];
