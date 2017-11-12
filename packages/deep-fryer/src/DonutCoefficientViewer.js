import React from 'react';
import PropTypes from 'prop-types';

const DonutCoefficientViewer = ({ coefficients }) => (
  <div className="DonutCoefficientViewer">
  </div>
);

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

