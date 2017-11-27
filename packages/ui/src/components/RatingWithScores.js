import React from 'react'
import PropTypes from 'prop-types'
import round from 'lodash/round'

import { getIndicator, getIndicatorParams } from 'donut-common/src/rater'

import RatingIndicator from './RatingIndicator'

const RatingWithScores = ({
  DONUT_FROSTING_COVERAGE,
  DONUT_FROSTING_THICKNESS,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
  DONUT_SPRINKLE_COVERAGE,
  score
}) => {
  const {
    frostingCoverage,
    frostingThickness,
    radius,
    sprinkleCoverage
  } = getIndicatorParams({
    DONUT_FROSTING_COVERAGE,
    DONUT_FROSTING_THICKNESS,
    DONUT_INNER_RADIUS,
    DONUT_OUTER_RADIUS,
    DONUT_SPRINKLE_COVERAGE
  })
  const indicator = getIndicator({
    DONUT_FROSTING_COVERAGE,
    DONUT_FROSTING_THICKNESS,
    DONUT_INNER_RADIUS,
    DONUT_OUTER_RADIUS,
    DONUT_SPRINKLE_COVERAGE
  })

  return (
    <div className='Rating RatingWithScores'>
      <table>
        <thead>
          <tr>
            <th />
            <th>Values</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Frosting coverage:</th>
            <td>
              <code>{round(DONUT_FROSTING_COVERAGE, 4).toFixed(4)}</code>
            </td>
            <td>
              <RatingIndicator rating={frostingCoverage} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Frosting thickness:</th>
            <td>
              <code>{round(DONUT_FROSTING_THICKNESS, 4).toFixed(4)}</code>
            </td>
            <td>
              <RatingIndicator rating={frostingThickness} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Radius:</th>
            <td>
              <code>{round(DONUT_INNER_RADIUS, 4).toFixed(4)}</code>,
              <code>{round(DONUT_OUTER_RADIUS, 4).toFixed(4)}</code>
            </td>
            <td>
              <RatingIndicator rating={radius} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Sprinkles:</th>
            <td>
              <code>{round(DONUT_SPRINKLE_COVERAGE, 4).toFixed(4)}</code>
            </td>
            <td>
              <RatingIndicator rating={sprinkleCoverage} />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope='row'>Overall</th>
            <td>
              <code>{round(indicator, 4).toFixed(4)}</code>
            </td>
            <td>
              <RatingIndicator rating={indicator} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Score</th>
            <td>
              <code>{round(score, 4).toFixed(4)}</code>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

RatingWithScores.propTypes = {
  DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
  DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
  DONUT_INNER_RADIUS: PropTypes.number.isRequired,
  DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
  DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}

export default RatingWithScores
