import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/DonutForm.css'

import { getEmoji } from './Rating'
import { getIndicatorParams } from 'donut-common/src/rater'

class DonutForm extends Component {
  constructor (props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  handleSave (event) {
    const { donut, onSave } = this.props
    event.preventDefault()
    onSave(donut)
  }
  render () {
    const {
      donut: {
        DONUT_FROSTING_COVERAGE,
        DONUT_FROSTING_THICKNESS,
        DONUT_SPRINKLE_COVERAGE,
        DONUT_INNER_RADIUS,
        DONUT_OUTER_RADIUS
      },
      onChangeFrostingCoverage,
      onChangeFrostingThickness,
      onChangeSprinkleCoverage,
      onChangeInnerRadius,
      onChangeOuterRadius
    } = this.props
    const {
      frostingCoverage,
      frostingThickness,
      radius,
      sprinkleCoverage
    } = getIndicatorParams({
      DONUT_FROSTING_COVERAGE,
      DONUT_FROSTING_THICKNESS,
      DONUT_SPRINKLE_COVERAGE,
      DONUT_INNER_RADIUS,
      DONUT_OUTER_RADIUS
    })

    return (
      <form className='DonutForm'>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label>Frosting Coverage:</label>
            <input
              onChange={(evt) => onChangeFrostingCoverage(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_FROSTING_COVERAGE}
            />
          </div>
          <span className='DonutForm-rating'>{getEmoji(frostingCoverage)}</span>
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label>Frosting Thickness:</label>
            <input
              onChange={(evt) => onChangeFrostingThickness(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_FROSTING_THICKNESS}
            />
          </div>
          <span className='DonutForm-rating'>{getEmoji(frostingThickness)}</span>
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label>Sprinkle Coverage:</label>
            <input
              onChange={(evt) => onChangeSprinkleCoverage(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_SPRINKLE_COVERAGE}
            />
          </div>
          <span className='DonutForm-rating'>{getEmoji(sprinkleCoverage)}</span>
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label>Inner Radius:</label>
            <input
              onChange={(evt) => onChangeInnerRadius(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_INNER_RADIUS}
            />
          </div>
          <div className='DonutForm-control'>
            <label>Outer Radius:</label>
            <input
              onChange={(evt) => onChangeOuterRadius(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_OUTER_RADIUS}
            />
          </div>
          <span className='DonutForm-rating'>{getEmoji(radius)}</span>
        </div>

        <button onClick={this.handleSave} type='submit'>Save</button>
      </form>
    )
  }
}

DonutForm.displayName = 'DonutForm'

DonutForm.propTypes = {
  donut: PropTypes.shape({
    DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
    DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
    DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired,
    DONUT_INNER_RADIUS: PropTypes.number.isRequired,
    DONUT_OUTER_RADIUS: PropTypes.number.isRequired
  }).isRequired,
  onChangeFrostingCoverage: PropTypes.func.isRequired,
  onChangeFrostingThickness: PropTypes.func.isRequired,
  onChangeInnerRadius: PropTypes.func.isRequired,
  onChangeOuterRadius: PropTypes.func.isRequired,
  onChangeSprinkleCoverage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default DonutForm
