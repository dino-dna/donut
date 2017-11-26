import React from 'react'
import { getIndicator, getIndicatorParams } from 'donut-common/src/rater'

import RatingIndicator from './RatingIndicator'
import '../css/Rating.css'

export default function Rating (props) {
  const indicator = getIndicator(props)
  const {
    frostingCoverage,
    frostingThickness,
    radius,
    sprinkleCoverage
  } = getIndicatorParams(props)

  return (
    <div className='Rating'>
      <table>
        <thead>
          <tr>
            <th scope='row'>Overall</th>
            <td>
              <RatingIndicator rating={indicator} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Frosting coverage:</th>
            <td>
              <RatingIndicator rating={frostingCoverage} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Frosting thickness:</th>
            <td>
              <RatingIndicator rating={frostingThickness} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Radius:</th>
            <td>
              <RatingIndicator rating={radius} />
            </td>
          </tr>
          <tr>
            <th scope='row'>Sprinkles:</th>
            <td>
              <RatingIndicator rating={sprinkleCoverage} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
