import React, { Component } from 'react';
import Donut from './Donut';
import '../css/Donuts.css';

// @TODO move me to view component
import DonutSettingsController from './DonutSettingsController';

class Donuts extends Component {
  render() {
    const donuts = [{
      innerRadius: .5,
      outerRadius: 1,
      sprinkleCoverage: .667,
      frostingCoverage: .2,
      frostingThickness: .8,
    }, {}, {}, {}];

    return (
      <ul className="Donuts">
        {donuts.map((donut, i) => {
          return (
            <li key={i}>
              <Donut donut={donut} />
            </li>
          )
        })}
        <DonutSettingsController />
      </ul>
    );
  }
}

export default Donuts;
