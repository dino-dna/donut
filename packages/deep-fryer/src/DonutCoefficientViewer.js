import React from 'react';
import PropTypes from 'prop-types';

const DonutCoefficientViewer = ({ coefficients }) => {
  let content;

  if (coefficients) {
    const {
      frostingCoverage,
      frostingThickness,
      innerRadius,
      outerRadius,
      sprinkleCoverage,
    } = coefficients;

    content = (
      <ul>
        <li>Frosting coverage: <code>{frostingCoverage}</code></li>
        <li>Frosting thickness: <code>{frostingThickness}</code></li>
        <li>Inner radius: <code>{innerRadius}</code></li>
        <li>Outer radius: <code>{outerRadius}</code></li>
        <li>Sprinkle coverage: <code>{sprinkleCoverage}</code></li>
      </ul>
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
    frostingCoverage: PropTypes.number.isRequired,
    frostingThickness: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    sprinkleCoverage: PropTypes.number.isRequired,
  }),
};

export default DonutCoefficientViewer;

