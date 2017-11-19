import React from 'react'
import PropTypes from 'prop-types'

const DonutViewer = ({ donuts }) => (
  <div className='DonutViewer' />
)

DonutViewer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.shape({
    frostingCoverage: PropTypes.number.isRequired,
    frostingThickness: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    sprinkleCoverage: PropTypes.number.isRequired
  })).isRequired
}

export default DonutViewer
