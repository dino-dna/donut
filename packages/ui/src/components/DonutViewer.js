import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'

import Donut from './Donut'
import Fade from './Fade'
import '../css/DonutViewer.css'

class DonutViewer extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      donuts: []
    }
  }

  /**
   * Handle new donuts via dispatched props.
   *
   * @param {Object} newProps
   * @param {Array[]} newProps.donuts
   */
  componentWillReceiveProps ({ donuts }) {
    const delay = 500
    const lifespan = 3000

    donuts.forEach(([id, donut], index) => {
      // Add donuts to state:
      setTimeout(() => {
        this.setState({
          donuts: [...this.state.donuts, [id, donut, index]]
        })
      }, delay * index)

      // Remove donut from state:
      setTimeout(() => {
        this.setState({
          donuts: this.state.donuts.filter(([_id]) => _id !== id)
        })
      }, lifespan + delay * index)
    })
  }

  render () {
    return (
      <div className='DonutViewer'>
        <TransitionGroup className='DonutViewer-TransitionGroup'>
          {this.state.donuts.map(([id, donut, index]) => (
            <Fade key={id}>
              <div>
                <div className={`DonutViewer-item ${index % 2 ? 'DonutViewer-item-odd' : ''}`}>
                  <Donut {...donut} />
                </div>
              </div>
            </Fade>
          ))}
        </TransitionGroup>
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
