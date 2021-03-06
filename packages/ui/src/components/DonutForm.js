import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/DonutForm.css'

import RatingIndicator from './RatingIndicator'
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
            <label htmlFor='DonutForm-frostingCoverage'>Frosting Coverage:</label>
            <input
              id='DonutForm-frostingCoverage'
              onChange={(evt) => onChangeFrostingCoverage(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_FROSTING_COVERAGE}
            />
          </div>
          <RatingIndicator rating={frostingCoverage} />
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label htmlFor='DonutForm-frostingThickness'>Frosting Thickness:</label>
            <input
              id='DonutForm-frostingThickness'
              onChange={(evt) => onChangeFrostingThickness(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_FROSTING_THICKNESS}
            />
          </div>
          <RatingIndicator rating={frostingThickness} />
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label htmlFor='DonutForm-sprinkleCoverage'>Sprinkle Coverage:</label>
            <input
              id='DonutForm-sprinkleCoverage'
              onChange={(evt) => onChangeSprinkleCoverage(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_SPRINKLE_COVERAGE}
            />
          </div>
          <RatingIndicator rating={sprinkleCoverage} />
        </div>
        <div className='DonutForm-group'>
          <div className='DonutForm-control'>
            <label htmlFor='DonutForm-innerRadius'>Inner Radius:</label>
            <input
              id='DonutForm-innerRadius'
              onChange={(evt) => onChangeInnerRadius(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_INNER_RADIUS}
            />
          </div>
          <div className='DonutForm-control'>
            <label htmlFor='DonutForm-outerRadius'>Outer Radius:</label>
            <input
              id='DonutForm-outerRadius'
              onChange={(evt) => onChangeOuterRadius(evt.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.005'
              value={DONUT_OUTER_RADIUS}
            />
          </div>
          <RatingIndicator rating={radius} />
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
