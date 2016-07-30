import React, { Component } from 'react';
import { connect } from 'react-redux';
import Donut from './Donut';
import DonutSettingsController from './DonutSettingsController';

class Viewer extends Component {
  render() {
    const { donut } = this.props;
    return (
      <div>
        <Donut donut={donut} />
        <DonutSettingsController donut={donut} />
      </div>
    );
  }
}

export default connect()(Viewer);
