import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Admin.css'

import { disableSpray, enableSpray } from '../state/ducks/admin'
import {
  submitModeRequest
} from '../state/ducks/submitMode'

class Admin extends Component {
  render () {
    const {
      disableSpray,
      enableSpray,
      errorMessage,
      isOn,
      isSpray,
      loading,
      submitModeRequest
    } = this.props

    /* eslint-disable jsx-a11y/accessible-emoji */
    const message = errorMessage
      ? <div className='Admin-error-message'>
        <span aria-hidden='true'>🚨</span>
        {errorMessage}
      </div>
      : undefined
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

        <button
          className='Admin-spray'
          onClick={() => isSpray ? disableSpray() : enableSpray()}
          type='button'
        >
          {isSpray ? 'Disable spray' : 'Enable spray'}
        </button>
      </div>
    )
  }
}

Admin.defaultProps = {
  errorMessage: ''
}

Admin.propTypes = {
  disableSpray: PropTypes.func.isRequired,

  enableSpray: PropTypes.func.isRequired,

  /** API request error */
  errorMessage: PropTypes.string,

  /** Retrieve the submit mode from API */
  getSubmitMode: PropTypes.func.isRequired,

  /** Whether 'submit mode' is on */
  isOn: PropTypes.bool.isRequired,

  isSpray: PropTypes.bool.isRequired,

  /** API requests are happenin' */
  loading: PropTypes.bool.isRequired,

  /** Enable or disable 'submit mode' */
  toggleSubmitMode: PropTypes.func.isRequired
}

export default connect(
  ({ admin, submitMode }) => ({
    ...submitMode,
    isSpray: admin.isSpray
  }),
  {
    disableSpray,
    enableSpray,
    submitModeRequest
  }
)(Admin)
