import React from 'react'
import PropTypes from 'prop-types'
import round from 'lodash/round'

import Donut from './Donut'
import Rating from './Rating'
import '../css/DonutPredictionViewer.css'

const DonutPredictionViewer = ({ models }) => {
  let content

  if (models) {
    const {
      ridge_regression_with_sim_ann: {
        donut,
        score
      }
    } = models

    content = (
      <div>
        <h1>Ridge regression</h1>
        <Donut {...donut} />
        <Rating {...donut} />
        <ul>
          <li>Frosting coverage: <code>{round(donut.DONUT_FROSTING_COVERAGE, 4)}</code></li>
          <li>Frosting thickness: <code>{round(donut.DONUT_FROSTING_THICKNESS, 4)}</code></li>
          <li>Inner radius: <code>{round(donut.DONUT_INNER_RADIUS, 4)}</code></li>
          <li>Outer radius: <code>{round(donut.DONUT_OUTER_RADIUS, 4)}</code></li>
          <li>Sprinkle coverage: <code>{round(donut.DONUT_SPRINKLE_COVERAGE, 4)}</code></li>
          <li>Score: <code>${score}</code></li>
        </ul>
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
