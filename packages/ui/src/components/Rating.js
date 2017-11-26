import React from 'react'
import { getIndicator, getIndicatorParams } from 'donut-common/src/rater'

import '../css/Rating.css'

function getEmoji (val) {
  if (val > 0.9) {
    return <span aria-label='good' role='img'>😎</span>
  } else if (val > 0.8) {
    return <span aria-label='okay' role='img'>😐</span>
  }
  return <span aria-label='bad' role='img'>😱</span>
}

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
            <td>{getEmoji(indicator)}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Frosting coverage:</th>
            <td>{getEmoji(frostingCoverage)}</td>
          </tr>
          <tr>
            <th scope='row'>Frosting thickness:</th>
            <td>{getEmoji(frostingThickness)}</td>
          </tr>
          <tr>
            <th scope='row'>Radius:</th>
            <td>{getEmoji(radius)}</td>
          </tr>
          <tr>
            <th scope='row'>Sprinkles:</th>
            <td>{getEmoji(sprinkleCoverage)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
