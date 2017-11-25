import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Donut from '../components/Donut'
import Rating from '../components/Rating'
import DonutAttributeControls from '../components/DonutAttributeControls'
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

const Create = ({
  addDonut,
  donut,
  onChangeFrostingCoverage,
  onChangeFrostingThickness,
  onChangeInnerRadius,
  onChangeOuterRadius,
  onChangeSprinkleCoverage
}) => (
  <div className='Create'>
    <div className='Create-donut'>
      <Donut {...donut} />
      <Rating {...donut} />
    </div>
    <DonutAttributeControls
      donut={donut}
      onChangeFrostingCoverage={onChangeFrostingCoverage}
      onChangeFrostingThickness={onChangeFrostingThickness}
      onChangeInnerRadius={onChangeInnerRadius}
      onChangeOuterRadius={onChangeOuterRadius}
      onChangeSprinkleCoverage={onChangeSprinkleCoverage}
      onSave={addDonut}
    />
  </div>
)

Create.propTypes = {
  addDonut: PropTypes.func.isRequired,
  donut: PropTypes.shape({
    DONUT_FROSTING_COVERAGE: PropTypes.number.isRequired,
    DONUT_FROSTING_THICKNESS: PropTypes.number.isRequired,
    DONUT_SPRINKLE_COVERAGE: PropTypes.number.isRequired,
    DONUT_INNER_RADIUS: PropTypes.number.isRequired,
    DONUT_OUTER_RADIUS: PropTypes.number.isRequired
  }).isRequired,
  onChangeFrostingCoverage: PropTypes.func.isRequired,
  onChangeFrostingThickness: PropTypes.func.isRequired,
  onChangeInnerRadius: PropTypes.func.isRequired,
  onChangeOuterRadius: PropTypes.func.isRequired,
  onChangeSprinkleCoverage: PropTypes.func.isRequired
}

const getAttributeSetter = attribute => value => setDonutAttribute({
  attribute,
  value
})

export default connect(
  ({ donut }) => ({ donut }),
  {
    addDonut,
    onChangeFrostingCoverage: getAttributeSetter(DONUT_FROSTING_COVERAGE),
    onChangeFrostingThickness: getAttributeSetter(DONUT_FROSTING_THICKNESS),
    onChangeSprinkleCoverage: getAttributeSetter(DONUT_SPRINKLE_COVERAGE),
    onChangeInnerRadius: getAttributeSetter(DONUT_INNER_RADIUS),
    onChangeOuterRadius: getAttributeSetter(DONUT_OUTER_RADIUS)
  }
)(Create)
