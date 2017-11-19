import React from 'react'
import PropTypes from 'prop-types'
import round from 'lodash/round'
import zipObject from 'lodash/zipObject'
import common from 'donut-common'

import Donut from './Donut'
import '../css/DonutPredictionViewer.css'

const DonutPredictionViewer = ({ models }) => {
  let content

  if (models) {
    const {
      ridge_regression_with_sim_ann: ridge
    } = models

    content = (
      <div>
        <h1>Ridge regression</h1>
        <Donut {...zipObject(common.keys, ridge)} />
        <ul>
          <li>Frosting coverage: <code>{round(ridge[0], 4)}</code></li>
          <li>Frosting thickness: <code>{round(ridge[1], 4)}</code></li>
          <li>Inner radius: <code>{round(ridge[2], 4)}</code></li>
          <li>Outer radius: <code>{round(ridge[3], 4)}</code></li>
          <li>Sprinkle coverage: <code>{round(ridge[4], 4)}</code></li>
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
    ridge_regression_with_sim_ann: PropTypes.arrayOf(PropTypes.number).isRequired
  })
}

export default DonutPredictionViewer
