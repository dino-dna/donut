import React from 'react'
import { storiesOf } from '@storybook/react'
import Sprinkle from './Sprinkle'

export default storiesOf('Sprinkle', module)
.add('basic', () => {
  return (
    <svg viewport='0 0 60 60' width='60' height='60'>
      <Sprinkle />
    </svg>
  )
})
.add('rotated', () => {
  return (
    <svg viewport='0 0 60 60'>
      <Sprinkle deg={90} />
    </svg>
  )
})
.add('rotated & translated', () => {
  return (
    <svg viewport='0 0 60 60'>
      <g style={{ transform: `translate(${25}px, ${25}px)` }}>
        <Sprinkle deg={45} />
      </g>
    </svg>
  )
})
