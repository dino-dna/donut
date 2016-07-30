import React, { Component } from 'react';
import '../css/DonutSettings.css';

class DonutSettings extends Component {
  constructor(props) {
    super(props);
    this.donut = this.props.donut || {
      DONUT_FROSTING_COVERAGE: .55,
      DONUT_FROSTING_THICKNESS: 1,
      // DONUT_SPRINKLE_COVERAGE: .75,
      DONUT_INNER_RADIUS: .15,
      DONUT_OUTER_RADIUS: .75,
    };
  }

  render() {
    const donut = this.props.donut || this.donut;
    const {
      onChangeFrostingCoverage,
      onChangeFrostingThickness,
      onChangeSprinkleCoverage,
      onChangeInnerRadius,
      onChangeOuterRadius,
    } = this.props;

    console.log(donut.DONUT_OUTER_RADIUS)
    return (
      <form className="DonutSettings">
        <h2>Make your donut:</h2>
        <div className="DonutSettings-control">
          <label>Frosting Coverage:</label>
          <input
            onChange={(evt) => onChangeFrostingCoverage(evt.target.value)}
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={donut.DONUT_FROSTING_COVERAGE}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Frosting Thickness:</label>
          <input
            onChange={(evt) => onChangeFrostingThickness(evt.target.value)}
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={donut.DONUT_FROSTING_THICKNESS}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Sprinkle Coverage:</label>
          <input
            onChange={(evt) => onChangeSprinkleCoverage(evt.target.value)}
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={donut.DONUT_SPRINKLE_COVERAGE}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Inner Radius:</label>
          <input
            onChange={(evt) => onChangeInnerRadius(evt.target.value)}
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={donut.DONUT_INNER_RADIUS}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Outer Radius:</label>
          <input
            onChange={(evt) => onChangeOuterRadius(evt.target.value)}
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={donut.DONUT_OUTER_RADIUS}
          />
        </div>

      </form>
    );
  }
}

DonutSettings.displayName = 'DonutSettings';

export default DonutSettings;
