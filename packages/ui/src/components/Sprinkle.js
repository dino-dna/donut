import React from 'react'
import memoize from 'lodash/memoize'

export const attrs = memoize((scale) => {
  const height = 1 * scale
  const width = height * 3
  const AA = height * 4.4771525 / 20
  const BB = height * 15.5228475 / 20
  const CC = width * 55.5228475 / 60
  const DD = height / 2
  const EE = height
  const FF = width * 5 / 6
  const GG = width
  const sprinklePath = `
    M${DD},0
    C${AA},0 0,${AA} 0,${DD}
    C0,${BB} ${AA},${EE} ${DD},${EE}
    L${FF},${EE}
    C${CC},${EE} ${GG},${BB} ${GG},${DD}
    C${GG},${AA} ${CC},0 ${FF},0
    L${DD},0 Z
  `
  return { sprinklePath, height, width }
})

function Sprinkle (props) {
  let { deg, color, scale } = props
  const { sprinklePath, height, width } = attrs(scale || 10)
  const xOffset = width / 2
  const yOffset = height / 2
  color = color || 'red'
  deg = deg || 0
  return (
    <path
      style={{ transformOrigin: `${xOffset}px ${yOffset}px`, transform: `translate(-${xOffset}px, -${yOffset}px) rotate(${deg}deg)` }}
      d={sprinklePath}
      fill={color}
     />
  )
}

export default Sprinkle
