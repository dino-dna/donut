import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DonutViewer extends Component {
  render () {
    return (
      <div className='DonutViewer'>
        {this.props.donuts.map(([id, donut]) => (
          <div>{id}</div>
        ))}
      </div>
    )
  }
}

DonutViewer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
      DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
      DONUT_INNER_RADIUS: PropTypes.number.isRequired,
      DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
      DONUT_RATING: PropTypes.number.isRequired,
      DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
    })
  ]).isRequired)
}

export default DonutViewer
