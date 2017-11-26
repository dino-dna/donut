import React from 'react'
import { number } from 'prop-types'

const RatingIndicator = ({ rating }) => {
  if (rating > 0.9) {
    return <span aria-label='good' className='RatingIndicator' role='img'>😎</span>
  } else if (rating > 0.8) {
    return <span aria-label='okay' className='RatingIndicator' role='img'>😐</span>
  }
  return <span aria-label='bad' className='RatingIndicator' role='img'>😱</span>
}

RatingIndicator.propTypes = {
  /** Number from 0-1 representing rating */
  rating: number.isRequired
}

export default RatingIndicator
