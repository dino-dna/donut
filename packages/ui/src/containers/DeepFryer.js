import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DonutPredictionViewer from '../components/DonutPredictionViewer'
import DonutViewer from '../components/DonutViewer'
import ErrorAlert from '../components/ErrorAlert'
import { removeError } from '../state/ducks/fryer'
import '../css/DeepFryer.css'

const DeepFryer = ({
  donuts,
  errors,
  models,
  onErrorClick
}) => {
  const errorsComponent = errors.length
    ? (
      <div className='DeepFryer-errors'>
        {errors.map(({ date, message }, index) => (
          <ErrorAlert
            key={date}
            message={message}
            onClick={() => onErrorClick(index)}
          />
        ))}
      </div>
    )
    : undefined

  return (
    <div className='DeepFryer'>
      {errorsComponent}
      <DonutPredictionViewer models={models} />
      <DonutViewer donuts={donuts} />
    </div>
  )
}

DeepFryer.defaultProps = {
  donuts: [],
  models: undefined
}

DeepFryer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
      DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
      DONUT_INNER_RADIUS: PropTypes.number.isRequired,
      DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
      DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
    })
  ]))),
  errors: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  })).isRequired,
  models: PropTypes.shape({
    ridge_regression_with_sim_ann: PropTypes.shape({
      donut: PropTypes.shape({
        DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
        DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
        DONUT_INNER_RADIUS: PropTypes.number.isRequired,
        DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
        DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
      }).isRequired,
      score: PropTypes.number.isRequired
    })
  }),
  onErrorClick: PropTypes.func.isRequired
}

export default connect(
  ({ fryer }) => fryer,
  {
    onErrorClick: removeError
  }
)(DeepFryer)
