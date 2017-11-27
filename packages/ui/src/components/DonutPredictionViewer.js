import React from 'react'
import PropTypes from 'prop-types'

import Donut from './Donut'
import RatingWithScores from './RatingWithScores'
import '../css/DonutPredictionViewer.css'

const DonutPredictionViewer = ({ models }) => {
  let content

  if (models) {
    const {
      knn,
      ridge_regression_with_sim_ann: ridgeRegression
    } = models

    content = (
      <div className='DonutPredictionViewer-panes'>
        <div className='DonutPredictionViewer-pane'>
          <h1>Ridge regression</h1>
          <Donut {...ridgeRegression.donut} />
          <RatingWithScores score={ridgeRegression.score} {...ridgeRegression.donut} />
        </div>
        <div className='DonutPredictionViewer-pane'>
          <h1>KNN</h1>
          <Donut {...knn.donut} />
          <RatingWithScores score={knn.score} {...knn.donut} />
        </div>
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
    knn: PropTypes.shape({
      donut: PropTypes.shape({
        DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
        DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
        DONUT_INNER_RADIUS: PropTypes.number.isRequired,
        DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
        DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
      }).isRequired,
      score: PropTypes.number.isRequired
    }).isRequired,
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
