import React from 'react'
import Donut from './Donut'
import Rating from './Rating'
import '../css/DonutList.css'

export default function DonutList (props) {
  const { donuts } = props
  return (
    <ul className='DonutList'>
      {donuts.map((donut, i) => {
        return (
          <li key={i}>
            <Donut {...donut} />
            <Rating {...donut} />
          </li>
        )
      })}
    </ul>
  )
}
