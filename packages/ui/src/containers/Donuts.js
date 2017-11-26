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
      <DonutList donuts={donuts} />
    )
    : (
      <div>
        <h1>We see that you’re very, very, hungry.</h1>
        <a href='https://giphy.com/gifs/pixel-art-donut-bd4td7PlhYY9i'>
          <img
            alt='A dancing pixel art donut'
            height='128'
            src='https://media.giphy.com/media/bd4td7PlhYY9i/giphy.gif'
            width='128'
          />
        </a>
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
