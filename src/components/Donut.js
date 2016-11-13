import React, { Component } from 'react';
import zip from 'lodash/zip';
import Rating from './Rating';
import '../css/Donut.css';

const isDev = process.env.NODE_ENV === 'development'

const TWO_PI = Math.PI * 2;
function getSprinklePath (scale) {
  const height = 1 * scale
  const width = 3 * scale
  const AA = height * 4.4771525 / 20
  const BB = height * 15.5228475 / 20
  const CC = width * 55.5228475 / 60
  const DD = height / 2
  const EE = height
  const FF = (5/6) * width
  const GG = width
  return {
    path: `
      M${DD},0
      C${AA},0 0,${AA} 0,${DD}
      C0,${BB} ${AA},${EE} ${DD},${EE}
      L${FF},${EE}
      C${CC},${EE} ${GG},${BB} ${GG},${DD}
      C${GG},${AA} ${CC},0 ${FF},0
      L${DD},0 Z
    `,
    height,
    width
  }
}
const sprinkle = getSprinklePath(2)
const ciruclarSprinkle = 0
const SPRINKLE_HEIGHT = ciruclarSprinkle ? sprinkle.width : sprinkle.height;
const SPRINKLE_WIDTH = sprinkle.width;
const HALF_SPRINKLE_WIDTH = SPRINKLE_WIDTH / 2;
const HALF_SPRINKLE_HEIGHT = SPRINKLE_HEIGHT / 2;
const sprinklePath = sprinkle.path;

export default class Donut extends Component {
  constructor(props) {
    super(props);
    this.renderSprinkles = this.renderSprinkles.bind(this);
  }

  /**
   *
   * @TODO cache. sniff for unchanged radii
   *
   * @param {any} innerRadius
   * @param {any} outerRadius
   * @param {any} bandGapWidth
   * @returns
   *
   * @memberOf Donut
   */
  getBandRadii(innerRadius, bandCount, bandGapWidth) {
    //      void     sprinkle   void     sprinkle
    // + --------- | ---------  =======  ---------  ======= --------- |
    //                             ^                   ^
    // +     IR          BG    iHSW oHSW
    // ring1 = IR + BG + 1*iHSW
    // ring2 = ring1 + 1*oHSW + BG + 1*iHSW
    const bandRadii = []
    for (let i=0; i < bandCount; ++i) {
      const innerHalfSprinkleWidths = (i + 1) * HALF_SPRINKLE_WIDTH;
      const outerHalfSprinkleWidths = i ? (i * HALF_SPRINKLE_WIDTH) : 0;
      const midBandWidths = i ? (i * bandGapWidth) : 0;
      bandRadii.push(
        innerRadius + bandGapWidth + innerHalfSprinkleWidths + outerHalfSprinkleWidths + midBandWidths
      )
    }
    return bandRadii
  }

  getSprinkledBands(bandRequest) {
    return bandRequest.map((band) => {
      let radius = band[0];
      let dTheta = TWO_PI / band[1];
      let startRadian = isDev ? 0 : Math.random() * TWO_PI;
      let endRadian = startRadian + TWO_PI;
      let theta = startRadian;
      let set = [];
      while (theta <= endRadian) {
        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)
        set.push({
          r: radius,
          x: radius * sinTheta,
          y: radius * cosTheta,
          sinTheta,
          cosTheta,
          thetaRad: theta,
          thetaDeg: this.radiansToDegrees(theta),
        });
        theta += dTheta;
      }
      return set;
    });
  }

  getSprinklesPerBand(bandRadii, coverage) {
    const edgeRadii = ciruclarSprinkle ? bandRadii : bandRadii.map(r => r - HALF_SPRINKLE_WIDTH);
    const edgeCircums = edgeRadii.map(r => r * TWO_PI);
    const totalCircum = edgeCircums.reduce((total, curr) => total + curr, 0);
    const totalSprinkles = Math.round((totalCircum / SPRINKLE_HEIGHT) * coverage);
    const edgeCirumPercentCoverage = edgeCircums.map(c => c / totalCircum);
    return edgeCirumPercentCoverage.map(pct => Math.floor(pct * totalSprinkles));
  }

  radiansToDegrees(rad) {
    return 360 * rad / TWO_PI;
  }

  renderSprinkles(innerRadius, outerRadius) {
    const {
      DONUT_FROSTING_THICKNESS,
      DONUT_SPRINKLE_COVERAGE
    } = this.props;
    if (!DONUT_SPRINKLE_COVERAGE) return;
    if (DONUT_FROSTING_THICKNESS < 0.2) return;
    const usableRadialLength = outerRadius - innerRadius
    const theoreticBandCount = usableRadialLength / SPRINKLE_WIDTH;
    if (theoreticBandCount < 1) return;
    const bandCount = Math.floor(theoreticBandCount);
    const unsprinkledRadialLength = usableRadialLength - bandCount * SPRINKLE_WIDTH;
    const bandGapWidth = unsprinkledRadialLength / (1 + bandCount)
    const bandRadii = this.getBandRadii(innerRadius, bandCount, bandGapWidth)
    const countPerBand = this.getSprinklesPerBand(bandRadii, DONUT_SPRINKLE_COVERAGE)
    const bandRequest = zip(bandRadii, countPerBand) // [[0.3, 10], [0.6, 20], ...]

    // locate sprinkles
    let bandSprinkles = this.getSprinkledBands(bandRequest)

    // flatten band-wise sprinkle definitions
    const allSprinkles = bandSprinkles.reduce((set, subset) => set.concat(subset), []);

    // generate sprinkle DOM
    return allSprinkles.map(({x, y, thetaDeg, sinTheta, cosTheta}, index) => {
      const sprinkle = ciruclarSprinkle
        ? <circle transform={`translate(${x}, ${y})`} r={SPRINKLE_WIDTH/2} fill={Donut.SPRINKLE_COLORS[index % 5]}/>
        : (
          <g>
            <path
              d={sprinklePath}
              fill={Donut.SPRINKLE_COLORS[index % 5]}
              transform={`translate(${x - cosTheta * HALF_SPRINKLE_WIDTH - sinTheta * HALF_SPRINKLE_HEIGHT},${y - cosTheta * HALF_SPRINKLE_HEIGHT + sinTheta * HALF_SPRINKLE_WIDTH}) rotate(${-thetaDeg})`}
            ></path>
            <circle transform={`translate(${x}, ${y})`} r={SPRINKLE_WIDTH/8} fill={'black'}/>
          </g>
        )
      return (<g key={index}>{sprinkle}</g>)
    });
  }

  render() {
    const {
      DONUT_FROSTING_COVERAGE,
      DONUT_FROSTING_THICKNESS,
      DONUT_INNER_RADIUS,
      DONUT_OUTER_RADIUS,
    } = this.props;

    const innerRadius = DONUT_INNER_RADIUS * 50;
    const outerRadius = DONUT_OUTER_RADIUS * 50;
    const frostRadius = (outerRadius + innerRadius) / 2;
    const frostStrokeWidth = (outerRadius - innerRadius) * DONUT_FROSTING_COVERAGE;
    const frostingInnerRadius = frostRadius - frostStrokeWidth / 2
    const frostingOuterRadius = frostRadius + frostStrokeWidth / 2
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
          <g transform="translate(50, 50)">
            {this.renderSprinkles(frostingInnerRadius, frostingOuterRadius)}
          </g>
        </svg>
        <Rating { ...this.props} />
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
