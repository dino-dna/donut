import React, { Component } from 'react';
import { connect } from 'react-redux';
import Donut from './Donut';
import DonutSettingsController from './DonutSettingsController';
import '../css/Viewer.css';

class Viewer extends Component {
  render() {
    const { donut } = this.props;
    return (
      <div className='Viewer'>
        <Donut {...donut} />
        <DonutSettingsController donut={donut} />
      </div>
    );
  }
}

export default connect(state => state)(Viewer);
