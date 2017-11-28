import React from 'react'
import Donut from './Donut'
import Rating from './Rating'
import '../css/DonutList.css'

export default function DonutList (props) {
  const { donuts, removeDonut } = props
  return (
    <ul className='DonutList'>
      {donuts.map((donut, i) => {
        return (
          <li key={i}>
            <button
              aria-label='Remove donut item'
              onClick={() => removeDonut(i)}
              type='button'
            >
              <span aria-hidden='true'>✕</span>
            </button>
            <Donut {...donut} />
            <Rating {...donut} />
          </li>
        )
      })}
    </ul>
  )
}
