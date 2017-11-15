import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import '../css/Admin.css';

import {
  submitModeRequest,
} from '../state/ducks/submitMode';

class Admin extends Component {
  render() {
    const { errorMessage, isOn, loading, submitModeRequest } = this.props;

    /* eslint-disable jsx-a11y/accessible-emoji */
    const message = errorMessage ?
      <div className='Admin-error-message'>
        <span aria-hidden='true'>🚨</span>
        {errorMessage}
      </div> :
      undefined;
    /* eslint-enable jsx-a11y/accessible-emoji */

    return (
      <div className={`Admin ${loading ? 'is-loading' : ''}`}>
        {message}
        <button
          className={`Admin-button Admin-button-${isOn ? 'on' : 'off'}`}
          disabled={loading}
          onClick={() => submitModeRequest(!isOn)}
          type='button'
        >
          {isOn ? 'Disable Donuts' : 'Enable Donuts'}
        </button>
      </div>
    );
  }
}

Admin.defaultProps = {
  errorMessage: '',
};

Admin.propTypes = {
  /** API request error */
  errorMessage: PropTypes.string,

  /** Retrieve the submit mode from API */
  getSubmitMode: PropTypes.func.isRequired,

  /** Whether 'submit mode' is on */
  isOn: PropTypes.bool.isRequired,

  /** API requests are happenin' */
  loading: PropTypes.bool.isRequired,

  /** Enable or disable 'submit mode' */
  toggleSubmitMode: PropTypes.func.isRequired,
};

export default connect(
  ({ submitMode }) => submitMode,
  {
    submitModeRequest,
  }
)(Admin);
