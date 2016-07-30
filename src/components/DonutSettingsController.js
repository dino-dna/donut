import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonutSettings from './DonutSettings';

class DonutSettingsController extends Component {
  render() {
    const { donut } = this.props;

    return <DonutSettings donut={donut} />
  }
}

DonutSettingsController.displayName = 'DonutSettingsController';

DonutSettingsController.propTypes = {

};

function mapStateToProps(state) {
  const { donut } = state;
  return {
    donut
  };
}

export default connect(mapStateToProps)(DonutSettingsController);
