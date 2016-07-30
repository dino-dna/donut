import React, { Component } from 'react';

class DonutSettings extends Component {
  render() {
    const { donut } = this.props;

    const DONUT_FROSTING_COVERAGE = 0;
    const DONUT_FROSTING_THICKNESS = 0;
    const DONUT_SPRINKLE_COVERAGE = 0;
    const DONUT_INNER_RADIUS = 0;
    const DONUT_OUTER_RADIUS = 0;

    const wat = function() {}

    const onChangeFrostingCoverage = wat;
    const onChangeFrostingThickness = wat;
    const onChangeSprinkleCoverage = wat;
    const onChangeInnerRadius = wat;
    const onChangeOuterRadius = wat;

    return (
      <form>
        <h2>Make your donut:</h2>
        <pre>{donut ? JSON.stringify(donut, null, 2) : 'no donut :('}</pre>

        <div className="DonutSettings-control">
          <label>Frosting Coverage:</label>
          <input
            onChange={onChangeFrostingCoverage}
            type="range"
            min="0"
            max="1"
            value={DONUT_FROSTING_COVERAGE}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Frosting Thickness:</label>
          <input
            onChange={onChangeFrostingThickness}
            type="range"
            min="0"
            max="1"
            value={DONUT_FROSTING_THICKNESS}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Sprinkle Coverage:</label>
          <input
            onChange={onChangeSprinkleCoverage}
            type="range"
            min="0"
            max="1"
            value={DONUT_SPRINKLE_COVERAGE}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Inner Radius:</label>
          <input
            onChange={onChangeInnerRadius}
            type="range"
            min="0"
            max="1"
            value={DONUT_INNER_RADIUS}
          />
        </div>
        <div className="DonutSettings-control">
          <label>Outer Radius:</label>
          <input
            onChange={onChangeOuterRadius}
            type="range"
            min="0"
            max="1"
            value={DONUT_OUTER_RADIUS}
          />
        </div>

      </form>
    );
  }
}

DonutSettings.displayName = 'DonutSettings';

export default DonutSettings;
