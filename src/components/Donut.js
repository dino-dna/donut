import React, { Component } from 'react';
import zip from 'lodash/zip';
import Rating from './Rating';
import '../css/Donut.css';

const isDev = process.env.NODE_ENV === 'development'

const TWO_PI = Math.PI * 2;
const SPRINKLE_WIDTH = 6;
const HALF_SPRINKLE_WIDTH = SPRINKLE_WIDTH / 2;
const SPRINKLE_HEIGHT = 6;
const HALF_SPRINKLE_HEIGHT = SPRINKLE_HEIGHT / 2;
const sprinkleD = `M10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 L50,20 C55.5228475,20 60,15.5228475 60,10 C60,4.4771525 55.5228475,0 50,0 L10,0 Z`
// const sprinkleD = `M10,0 C${0.223857625*SPRINKLE_HEIGHT},0 0,${0.223857625*SPRINKLE_HEIGHT} 0,${0.5*SPRINKLE_HEIGHT} C0,${0.7761423749999999*SPRINKLE_HEIGHT} ${4.4771525/SPRINKLE_HEIGHT},${SPRINKLE_HEIGHT} ${0.5*SPRINKLE_HEIGHT},${SPRINKLE_HEIGHT} L${SPRINKLE_WIDTH*5/6},${SPRINKLE_HEIGHT} C${0.9253807916666666*SPRINKLE_WIDTH},${SPRINKLE_HEIGHT} ${SPRINKLE_WIDTH},${0.7761423749999999*SPRINKLE_HEIGHT} ${SPRINKLE_WIDTH},${0.5*SPRINKLE_HEIGHT} C${SPRINKLE_WIDTH},${0.223857625*SPRINKLE_HEIGHT} ${0.9253807916666666*SPRINKLE_WIDTH},0 ${SPRINKLE_WIDTH*5/6},0 L${0.5*SPRINKLE_HEIGHT},0 Z`

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
        set.push([
          (radius) * Math.sin(theta), // x
          (radius) * Math.cos(theta), // y
          this.radiansToDegrees(theta), // rotation
        ]);
        theta += dTheta;
      }
      return set;
    });
  }

  getSprinklesPerBand(innerRadius, outerRadius, radii, coverage) {
    const edgeRadii = radii.map(r => r - HALF_SPRINKLE_WIDTH);
    const edgeCircums = edgeRadii.map(r => r * TWO_PI);
    const totalCircum = edgeCircums.reduce((t, c) => t + c, 0);
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
    const theoreticBandCount = (outerRadius - innerRadius) / SPRINKLE_WIDTH;
    if (theoreticBandCount < 1) return;
    const bandCount = Math.floor(theoreticBandCount);
    const unsprinkledWidth = (outerRadius - innerRadius) - bandCount * SPRINKLE_WIDTH;
    const bandGapWidth = unsprinkledWidth / (1 + bandCount)
    const bandRadii = this.getBandRadii(innerRadius, bandCount, bandGapWidth)
    const countPerBand = this.getSprinklesPerBand(innerRadius, outerRadius, bandRadii, DONUT_SPRINKLE_COVERAGE)
    const bandRequest = zip(bandRadii, countPerBand) // [[0.3, 10], [0.6, 20], ...]

    // locate sprinkles
    let bandSprinkles = this.getSprinkledBands(bandRequest)

    // flatten band-wise sprinkle definitions
    let sprinkles = bandSprinkles.reduce((set, subset) => set.concat(subset), []);

    // generate sprinkle DOM
    return sprinkles.map(([x, y, rotation], index) => {

      return (
        <g>
          <path
            key={index}
            d={sprinkleD}
            fill={Donut.SPRINKLE_COLORS[index % 5]}
            transform={`translate(${x-3},${y-1}) scale(0.1) rotate(${-rotation}, 30, 10)`}
          ></path>
          {/* <circle transform={`translate(${x}, ${y})`} r="1" fill={Donut.SPRINKLE_COLORS[index % 5]}/>*/}
        </g>
      );
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
