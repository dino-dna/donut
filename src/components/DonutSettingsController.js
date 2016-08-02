import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DonutSettings from './DonutSettings';
import * as dnut from '../state/ducks/donut';
import { addDonut, updateDonut } from '../state/ducks/donuts';

class DonutSettingsController extends Component {
  constructor(props) {
    super(props);
    this.onChangeFrostingCoverage = this.onChangeFrostingCoverage.bind(this)
    this.onChangeFrostingThickness = this.onChangeFrostingThickness.bind(this)
    this.onChangeSprinkleCoverage = this.onChangeSprinkleCoverage.bind(this)
    this.onChangeInnerRadius = this.onChangeInnerRadius.bind(this)
    this.onChangeOuterRadius = this.onChangeOuterRadius.bind(this)
    this.onSave = this.onSave.bind(this);
  }
  onChangeFrostingCoverage (value) {
    const { dispatch } = this.props;
    dispatch(dnut.setDonutAttribute({
      attribute: dnut.DONUT_FROSTING_COVERAGE, value
      }));
  }
  onChangeFrostingThickness (value) {
    const { dispatch } = this.props;
    dispatch(dnut.setDonutAttribute({
      attribute: dnut.DONUT_FROSTING_THICKNESS, value
      }));
  }
  onChangeSprinkleCoverage (value) {
    const { dispatch } = this.props;
    dispatch(dnut.setDonutAttribute({
      attribute: dnut.DONUT_SPRINKLE_COVERAGE, value
      }));
  }
  onChangeInnerRadius (value) {
    const { dispatch } = this.props;
    dispatch(dnut.setDonutAttribute({
      attribute: dnut.DONUT_INNER_RADIUS, value
      }));
  }
  onChangeOuterRadius (value) {
    const { dispatch } = this.props;
    dispatch(dnut.setDonutAttribute({
      attribute: dnut.DONUT_OUTER_RADIUS, value
      }));
  }
  onSave(donut) {
    const { dispatch, id } = this.props;

    if (id) {
      dispatch(updateDonut(id, donut));
    } else {
      dispatch(addDonut(donut));
    }
  }
  render() {
    const { donut } = this.props;
    return <DonutSettings
      donut={donut}
      onChangeFrostingCoverage={this.onChangeFrostingCoverage}
      onChangeFrostingThickness={this.onChangeFrostingThickness}
      onChangeSprinkleCoverage={this.onChangeSprinkleCoverage}
      onChangeInnerRadius={this.onChangeInnerRadius}
      onChangeOuterRadius={this.onChangeOuterRadius}
      onSave={this.onSave}
    />
  }
}

DonutSettingsController.displayName = 'DonutSettingsController';

DonutSettingsController.propTypes = {
  donut: PropTypes.object.isRequired,
  id: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(DonutSettingsController);