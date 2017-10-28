import React from 'react';
import PropTypes from 'prop-types';

const DonutViewer = ({ donuts }) => (
  <div className="DonutViewer">
  </div>
);

DonutViewer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DonutViewer;
