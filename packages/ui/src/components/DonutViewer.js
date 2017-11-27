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
      donuts: [],
      donutQueue: []
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
    const nextQueue = [
      ...this.state.donutQueue,
      ...donuts.map(([id, donut]) => ({
        id,
        donut,
        isScheduled: false
      }))
    ].slice(0, 10)
    let toSchedule = nextQueue.filter(({ isScheduled }) => !isScheduled)

    this.setState({
      donuts: this.state.donuts,
      donutQueue: nextQueue.map(item => ({ ...item, isScheduled: true }))
    })

    toSchedule
      .forEach((obj, index) => {
        // Add donuts to state:
        setTimeout(() => {
          console.log('before', this.state.donuts.length, this.state.donutQueue.length)
          console.log('adding this ID', obj.id)
          this.setState({
            donuts: [...this.state.donuts, [obj.id, obj.donut, index]],
            donutQueue: this.state.donutQueue.map(o1 => {
              if (o1.id === obj.id) {
                return Object.assign(o1, { isScheduled: true })
              }
              return o1
            })
          })
        }, delay * index)

        // Remove donut from state:
        setTimeout(() => {
          console.log('after', this.state.donuts.length, this.state.donutQueue.length)
          this.setState({
            donuts: this.state.donuts.filter(([_id]) => _id !== obj.id),
            donutQueue: this.state.donutQueue.filter(({ id }) => id !== obj.id)
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

DonutViewer.defaultProps = {
  donuts: []
}

DonutViewer.propTypes = {
  donuts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
      DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
      DONUT_INNER_RADIUS: PropTypes.number.isRequired,
      DONUT_OUTER_RADIUS: PropTypes.number.isRequired,
      DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired
    })
  ])))
}

export default DonutViewer
