import React from 'react'
import PropTypes from 'prop-types'

import Donut from './Donut'
import RatingWithScores from './RatingWithScores'
import '../css/DonutPredictionViewer.css'

const DonutPredictionViewer = ({ models }) => {
  let content

  if (models) {
    const {
      ridge_regression_with_sim_ann: {
        donut,
        score: error
      }
    } = models

    content = (
      <div>
        <h1>Ridge regression</h1>
        <Donut {...donut} />
        <RatingWithScores error={error} {...donut} />
      </div>
    )
  } else {
    content = <span>Awaiting models…</span>
  }

  return (
    <div className='DonutPredictionViewer'>
      {content}
    </div>
  )
}

DonutPredictionViewer.propTypes = {
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
    }).isRequired
  })
}

export default DonutPredictionViewer
