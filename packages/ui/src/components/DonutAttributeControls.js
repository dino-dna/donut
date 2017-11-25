import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/DonutAttributeControls.css'

class DonutAttributeControls extends Component {
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

    return (
      <form className='DonutAttributeControls'>
        <h2>Make your donut:</h2>
        <div className='DonutAttributeControls-control'>
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
        <div className='DonutAttributeControls-control'>
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
        <div className='DonutAttributeControls-control'>
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
        <div className='DonutAttributeControls-control'>
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
        <div className='DonutAttributeControls-control'>
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

        <button onClick={this.handleSave} type='submit'>Save</button>
      </form>
    )
  }
}

DonutAttributeControls.displayName = 'DonutAttributeControls'

DonutAttributeControls.propTypes = {
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

export default DonutAttributeControls
