import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import DonutList from '../components/DonutList'
import Upload from '../components/Upload'
import { uploadRequest } from '../state/ducks/upload.js'
import '../css/Donuts.css'

const Donuts = ({
  donuts,
  errorMessage,
  hasUploaded,
  isLoading,
  isOn,
  uploadDonuts
}) => {
  const hasDonuts = !!(donuts && donuts.length)

  const className = classNames('Donuts', {
    'is-empty': !hasDonuts
  })
  const content = hasDonuts
    ? (
      <div>
        <h3>Your donuts, your highness…</h3>
        <DonutList donuts={donuts} />
      </div>
    )
    : (
      <div>
        <h1>We see that you’re very, very, hungry.</h1>
        <span
          aria-label='Donut'
          role='img'
        >
          🍩
        </span>
        <Link
          className='Donuts-link'
          to='/create'
        >
          <span aria-hidden='true'>+</span> New Donuts
        </Link>
      </div>
    )

  return (
    <div className={className}>
      {content}
      <Upload
        errorMessage={errorMessage}
        hasUploaded={hasUploaded}
        isOn={hasDonuts && isOn}
        isLoading={isLoading}
        uploadRequest={() => uploadDonuts(donuts)}
      />
    </div>
  )
}

Donuts.defaultProps = {
  donuts: undefined,
  errorMessage: undefined
}

Donuts.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  hasUploaded: PropTypes.bool.isRequired,
  isOn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uploadDonuts: PropTypes.func.isRequired
}

export default connect(
  ({
    donuts,
    submitMode: { isOn },
    upload
  }) => ({
    ...upload,
    isOn,
    donuts
  }),
  {
    uploadDonuts: uploadRequest
  }
)(Donuts)
