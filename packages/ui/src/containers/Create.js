import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import Donut from '../components/Donut'
import DonutForm from '../components/DonutForm'
import '../css/Create.css'
import {
  DONUT_FROSTING_COVERAGE,
  DONUT_FROSTING_THICKNESS,
  DONUT_INNER_RADIUS,
  DONUT_OUTER_RADIUS,
  DONUT_SPRINKLE_COVERAGE,
  setDonutAttribute
} from '../state/ducks/donut'
import { addDonut } from '../state/ducks/donuts'

class Create extends Component {
  constructor (props, ...args) {
    super(props, ...args)

    const getDebounced = attribute => debounce(
      value => props.setDonutAttribute({
        attribute,
        value
      }),
      100,
      {
        leading: true,
        trailing: false,
        maxWait: 100
      }
    )

    this.handleFrostingCoverageChange = getDebounced(DONUT_FROSTING_COVERAGE)
    this.handleFrostingThicknessChange = getDebounced(DONUT_FROSTING_THICKNESS)
    this.handleInnerRadiusChange = getDebounced(DONUT_INNER_RADIUS)
    this.handleOuterRadiusChange = getDebounced(DONUT_OUTER_RADIUS)
    this.handleSprinkleCoverageChange = getDebounced(DONUT_SPRINKLE_COVERAGE)
  }

  render () {
    const {
      addDonut,
      donut
    } = this.props

    return (
      <div className='Create'>
        <Donut {...donut} />
        <DonutForm
          donut={donut}
          onChangeFrostingCoverage={this.handleFrostingCoverageChange}
          onChangeFrostingThickness={this.handleFrostingThicknessChange}
          onChangeInnerRadius={this.handleInnerRadiusChange}
          onChangeOuterRadius={this.handleOuterRadiusChange}
          onChangeSprinkleCoverage={this.handleSprinkleCoverageChange}
          onSave={addDonut}
        />
      </div>
    )
  }
}

Create.propTypes = {
  addDonut: PropTypes.func.isRequired,
  donut: PropTypes.shape({
    DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
    DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
    DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired,
    DONUT_INNER_RADIUS: PropTypes.number.isRequired,
    DONUT_OUTER_RADIUS: PropTypes.number.isRequired
  }).isRequired,
  setDonutAttribute: PropTypes.func.isRequired
}

export default connect(
  ({ donut }) => ({ donut }),
  {
    addDonut,
    setDonutAttribute
  }
)(Create)
