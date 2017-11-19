import React from 'react';
import PropTypes from 'prop-types';
import zipObject from 'lodash/zipObject';
import common from 'donut-common';

import Donut from './Donut';
import '../css/DonutPredictionViewer.css';

const DonutPredictionViewer = ({ models }) => {
  let content;

  if (models) {
    const {
      ridge_regression_with_sim_ann: ridge,
    } = models;

    content = (
      <div>
        <h1>Ridge regression</h1>
        <Donut {...zipObject(common.keys, ridge)} />
        <ul>
          <li>Frosting coverage: <code>{ridge[0]}</code></li>
          <li>Frosting thickness: <code>{ridge[1]}</code></li>
          <li>Inner radius: <code>{ridge[2]}</code></li>
          <li>Outer radius: <code>{ridge[3]}</code></li>
          <li>Sprinkle coverage: <code>{ridge[4]}</code></li>
        </ul>
      </div>
    );
  } else {
    content = <span>Awaiting models…</span>;
  }

  return (
    <div className='DonutPredictionViewer'>
      {content}
    </div>
  );
};

DonutPredictionViewer.propTypes = {
  models: PropTypes.shape({
    ridge_regression_with_sim_ann: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default DonutPredictionViewer;

