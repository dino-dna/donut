import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import '../css/Upload.css'

const Upload = ({
  errorMessage,
  hasUploaded,
  isOn,
  isLoading,
  uploadRequest
}) => {
  const disabled = !isOn || isLoading || hasUploaded
  const containerClassName = classNames('Upload', {
    'Upload-disabled': disabled,
    'Upload-loading': isLoading,
    'Upload-visible': isOn
  })

  // TODO: Use/style errorMessage
  const errorMessageComponent = errorMessage
    ? <p className='Upload-error-message'>{errorMessage}</p>
    : undefined

  return (
    <div className={containerClassName}>
      {errorMessageComponent}
      <button
        className='Upload-Button'
        disabled={disabled}
        onClick={uploadRequest}
        type='button'
      >
        Upload
      </button>
    </div>
  )
}

Upload.defaultProps = {
  errorMessage: undefined
}

Upload.propTypes = {
  errorMessage: PropTypes.string,
  hasUploaded: PropTypes.bool.isRequired,
  isOn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uploadRequest: PropTypes.func.isRequired
}

export default Upload
