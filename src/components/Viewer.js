import React, { Component } from 'react';
import DonutSettingsController from './DonutSettingsController';

class Viewer extends Component {
  render() {
    // const { donut } = this.props;
    return (
      <div>
        <DonutSettingsController />
      </div>
    );
  }
}

export default Viewer;