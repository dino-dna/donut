import React from 'react';
import PropTypes from 'prop-types';

const DonutCoefficientViewer = ({ coefficients }) => {
  let content;

  if (coefficients) {
    const {
      linear_regression,
      ridge_regression
    } = coefficients;

    content = (
      <div>
        <h1>Linear regression</h1>
        <ul>
          <li>Frosting coverage: <code>{linear_regression[0]}</code></li>
          <li>Frosting thickness: <code>{linear_regression[1]}</code></li>
          <li>Inner radius: <code>{linear_regression[2]}</code></li>
          <li>Outer radius: <code>{linear_regression[3]}</code></li>
          <li>Sprinkle coverage: <code>{linear_regression[4]}</code></li>
        </ul>
        <h1>Ridge regression</h1>
        <ul>
          <li>Frosting coverage: <code>{ridge_regression[0]}</code></li>
          <li>Frosting thickness: <code>{ridge_regression[1]}</code></li>
          <li>Inner radius: <code>{ridge_regression[2]}</code></li>
          <li>Outer radius: <code>{ridge_regression[3]}</code></li>
          <li>Sprinkle coverage: <code>{ridge_regression[4]}</code></li>
        </ul>
      </div>
    );
  } else {
    content = <span>Awaiting coefficients…</span>;
  }

  return (
    <div className='DonutCoefficientViewer'>
      {content}
    </div>
  );
};

DonutCoefficientViewer.propTypes = {
  coefficients: PropTypes.shape({
    linear_regression: PropTypes.arrayOf(PropTypes.number).isRequired,
    ridge_regression: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
};

export default DonutCoefficientViewer;

