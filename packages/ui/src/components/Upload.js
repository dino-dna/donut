import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Upload.css'

class Upload extends Component {
  handleClick() {
  }
  render() {
    return (
      <div className='Upload'>
        <button
          className='Upload-Button'
          onClick={this.handleClick}
          type='button'
        >
          Upload
        </button>
      </div>
    );
  }
}

export default connect()(Upload)
