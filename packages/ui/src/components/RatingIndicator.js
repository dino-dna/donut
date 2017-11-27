import React from 'react'
import { number } from 'prop-types'

const RatingIndicator = ({ rating }) => {
  let emoji
  let label

  if (rating > 6 / 7) {
    emoji = '😎'
    label = 'great'
  } else if (rating > 5 / 7) {
    emoji = '🙂'
    label = 'good'
  } else if (rating > 4 / 7) {
    emoji = '😐'
    label = 'still acceptable'
  } else if (rating > 3 / 7) {
    emoji = '😕'
    label = 'so-so'
  } else if (rating > 2 / 7) {
    emoji = '😧'
    label = 'bad'
  } else if (rating > 1 / 7) {
    emoji = '😱'
    label = 'awful'
  } else {
    emoji = '😵'
    label = 'the worst'
  }

  return <span aria-label={label} className='RatingIndicator' role='img'>{emoji}</span>
}

RatingIndicator.propTypes = {
  /** Number from 0-1 representing rating */
  rating: number.isRequired
}

export default RatingIndicator
