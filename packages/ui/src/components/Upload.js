import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'; 
import { connect } from 'react-redux'
import '../css/Upload.css'

import { upload as uploadDonuts } from '../state/ducks/upload.js'

const Upload = ({
  donuts,
  errorMessage,
  hasUploaded,
  isOn,
  isLoading,
  uploadDonuts,
}) => {
  const disabled = false // !isOn || isLoading || hasUploaded;
  const containerClassName = classNames('Upload', {
    'Upload-disabled': disabled,
    'Upload-loading': isLoading,
    'Upload-visible': true, // isOn,
  });

  // TODO: Use/style errorMessage
  const errorMessageComponent = errorMessage ?
    <p className="Upload-error-message">{errorMessage}</p> :
    undefined;

  return (
    <div className={containerClassName}>
      {errorMessageComponent}
      <button
        className='Upload-Button'
        disabled={disabled}
        onClick={() => uploadDonuts(donuts)}
        type='button'
      >
        Upload
      </button>
    </div>
  );
};

Upload.defaultProps = {
  errorMessage: undefined,
};

Upload.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorMessage: PropTypes.string,
  hasUploaded: PropTypes.bool.isRequired,
  isOn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uploadDonuts: PropTypes.func.isRequired,
};

export default connect(
  ({
    donuts,
    submitMode: { isOn },
    upload,
  }) => ({ ...upload, isOn, donuts }),
  { uploadDonuts }
)(Upload);
