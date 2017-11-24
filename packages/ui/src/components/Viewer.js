import React, { Component } from 'react'
import { connect } from 'react-redux'
import Donut from './Donut'
import Rating from './Rating'
import DonutSettingsController from './DonutSettingsController'
import '../css/Viewer.css'

class Viewer extends Component {
  render () {
    const { donut } = this.props
    return (
      <div className='Viewer'>
        <div className='Viewer-donut'>
          <Donut {...donut} />
          <Rating {...donut} />
        </div>
        <DonutSettingsController donut={donut} />
      </div>
    )
  }
}

export default connect(state => state)(Viewer)
