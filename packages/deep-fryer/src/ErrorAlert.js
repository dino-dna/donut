import React from 'react';
import PropTypes from 'prop-types';

import './ErrorAlert.css';

const ErrorAlert = ({ message, onClick }) => (
  <div
    className='ErrorAlert'
    role='alert'
  >
    <span
      aria-hidden='true'
      role='img'
    >
      💣
    </span>
    {message}
    <button
      aria-label='Close error message'
      onClick={onClick}
      type='button'
    >
      <span aria-hidden='true'>✕</span>
    </button>
  </div>
);

ErrorAlert.propTypes = {
  /** Error alert message */
  message: PropTypes.string.isRequired,

  /** Error alert close click handler */
  onClick: PropTypes.func.isRequired,
};

export default ErrorAlert;
