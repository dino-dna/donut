import React, { Component } from 'react';
import '../css/DonutSettings.css';

function DonutSettings(props) {
  const {
    donut: {
      DONUT_FROSTING_COVERAGE,
      DONUT_FROSTING_THICKNESS,
      DONUT_SPRINKLE_COVERAGE,
      DONUT_INNER_RADIUS,
      DONUT_OUTER_RADIUS,
    },
    onChangeFrostingCoverage,
    onChangeFrostingThickness,
    onChangeSprinkleCoverage,
    onChangeInnerRadius,
    onChangeOuterRadius,
  } = props;

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
          value={DONUT_FROSTING_COVERAGE}
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
          value={DONUT_FROSTING_THICKNESS}
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
          value={DONUT_SPRINKLE_COVERAGE}
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
          value={DONUT_INNER_RADIUS}
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
          value={DONUT_OUTER_RADIUS}
        />
      </div>

    </form>
  );
}

DonutSettings.displayName = 'DonutSettings';

export default DonutSettings;
