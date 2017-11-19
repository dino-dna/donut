import React from 'react'
import PropTypes from 'prop-types'

const DonutViewer = ({ donuts }) => (
  <div className='DonutViewer' />
)

DonutViewer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.shape({
    DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
    DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
    DONUT_INNER_RADIUS: PropTypes.number.isRequired,
    DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
    DONUT_RATING: PropTypes.number.isRequired,
    DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
  })).isRequired
}

export default DonutViewer
