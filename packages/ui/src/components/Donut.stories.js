import React from 'react'
import { storiesOf } from '@storybook/react'
// import Donut from './Donut'

const outerRadius = 40
const innerRadius = 10

export default storiesOf('Donut', module)
.add('basic', () => {
  return (
    <div className='Donut'>
      <svg viewBox='0 0 100 100'>
        <circle cx={50} cy={50} r={outerRadius} fill='#efcc9a' stroke='#20426a' strokeWidth='2' />
        <circle cx={50} cy={50} r={innerRadius} fill='#4084f2' stroke='#20426a' strokeWidth='2' />
      </svg>
    </div>
  )
})
