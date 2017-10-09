import React, { Component } from 'react';
import Sprinkle, { attrs as sprinkleAttrs } from './Sprinkle'
import zip from 'lodash/zip';
import Rating from './Rating';
import '../css/Donut.css';

const isDev = process.env.NODE_ENV === 'development'

const SPRINKLE_SCALE = 2;
const SPRINKLE_META = sprinkleAttrs(SPRINKLE_SCALE);
const TWO_PI = Math.PI * 2;
const SPRINKLE_HEIGHT = SPRINKLE_META.height;
const SPRINKLE_WIDTH = SPRINKLE_META.width;
const HALF_SPRINKLE_WIDTH = SPRINKLE_WIDTH / 2;

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

  getSprinkledBands(bandRequest, radialWiggle) {
    return bandRequest.map((band) => {
      let radius = band[0];
      let dTheta = TWO_PI / band[1];
      let i = band[1]
      let startRadian = isDev ? 0 : Math.random() * TWO_PI;
      let theta = startRadian;
      let set = [];

      while (i > 0) {
        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)
        let randRadius = radius + (Math.random() - 0.5) * radialWiggle
        set.push({
          x: randRadius * sinTheta,
          y: randRadius * cosTheta,
          sinTheta,
          cosTheta,
          thetaDeg: isDev ? this.radiansToDegrees(theta) : 360 * Math.random(),
        });
        theta += dTheta;
        --i;
      }
      return set;
    });
  }

  getSprinklesPerBand(bandRadii, coverage) {
    const edgeRadii = bandRadii.map(r => r - HALF_SPRINKLE_WIDTH);
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
    let bandSprinkles = this.getSprinkledBands(bandRequest, (unsprinkledRadialLength + bandGapWidth + SPRINKLE_WIDTH) / bandCount)

    // flatten band-wise sprinkle definitions
    const allSprinkles = bandSprinkles.reduce((set, subset) => set.concat(subset), []);

    // generate sprinkle DOM
    return allSprinkles.map(({x, y, thetaDeg, sinTheta, cosTheta}, index) => {
      const sprinkle = (
        <g transform={`translate(${x}, ${y})`}>
          <Sprinkle color={Donut.SPRINKLE_COLORS[index % 5]} scale={SPRINKLE_SCALE} deg={-thetaDeg+90}/>
          {/*<circle r={SPRINKLE_WIDTH/8} fill={'black'}/> */}
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
      <div className='Donut'>
        <svg viewBox='0 0 100 100'>
          <circle cx={50} cy={50} r={outerRadius} fill='#efcc9a' stroke='#20426a' strokeWidth='2' />
          <circle cx={50} cy={50} r={innerRadius} fill='white' stroke='#20426a' strokeWidth='2' />
          <circle
            cx={50}
            cy={50}
            fill='transparent'
            opacity={DONUT_FROSTING_THICKNESS}
            r={frostRadius}
            stroke='#f288a9'
            strokeWidth={frostStrokeWidth} />
          <g transform='translate(50, 50)'>
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
