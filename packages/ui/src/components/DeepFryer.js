import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.slim.js';
import { messages } from 'donut-common';

import ConnectionBadge from './ConnectionBadge';
import DonutCoefficientViewer from './DonutCoefficientViewer';
import DonutViewer from './DonutViewer';
import ErrorAlert from './ErrorAlert';
import '../css/DeepFryer.css';

/**
 * Messages contain 'donut' model(s). Singular model is an array of
 * length 5, where the indexed items represent properties:
 *
 *   DONUT_FROSTING_COVERAGE
 *   DONUT_FROSTING_THICKNESS
 *   DONUT_SPRINKLE_COVERAGE
 *   DONUT_INNER_RADIUS
 *   DONUT_OUTER_RADIUS
 */
const toProps = ([
  frostingCoverage,
  frostingThickness,
  sprinkleCoverage,
  innerRadius,
  outerRadius
]) => ({
  frostingCoverage,
  frostingThickness,
  sprinkleCoverage,
  innerRadius,
  outerRadius
});

class DeepFryer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      coefficients: null,
      connected: false,
      donuts: [],
      errors: [],
      submitMode: false,
    };

    this.handleSubmitModeChange = this.handleSubmitModeChange.bind(this);
  }

  componentWillMount() {
    const socket = this.socket = io('http://localhost:3001')

    socket.on('error', error => this.handleError);
    socket.on('disconnect', () => {
      this.setState({
        ...this.state,
        connected: false,
      });
    });
    socket.on('connect', () => {
      this.setState({
        ...this.state,
        connected: true,
      });
    });
    socket.on(messages.INIT_CLIENT, this.handleSubmitModeChange)
    socket.on(messages.NEW_DONUTS, (donuts) => {
      this.setState({
        ...this.state,
        donuts: [...this.state.donuts, ...donuts.map(toProps)]
      });
    });
    socket.on(messages.NEW_REGRESSION_RESULTS, (coefficients) => {
      this.setState({
        ...this.state,
        coefficients,
      });
    });

    socket.on(messages.SUBMIT_MODE, this.handleSubmitModeChange);
  }

  componentWillUnmount() {
    this.socket.once('disconnect', () => {
      this.socket.removeAllListeners();
      delete this.socket;
    });
    this.socket.close();
  }

  handleError(error) {
    console.error(error);

    error.date = Date.now();

    this.setState({
      ...this.state,
      errors: [...this.state.errors, error],
    });
  }

  handleErrorAlertClick(index) {
    this.setState({
      ...this.state,
      errors: this.state.errors.filter((e, i) => i !== index),
    });
  }

  handleSubmitModeChange({ submitMode }) {
    this.setState({
      ...this.state,
      submitMode,
    });
  }

  renderErrors() {
    const { errors } = this.state;

    if (errors.length) {
      return (
        <div className='App-errors'>
          {errors.map(({ date, message }, index) => (
            <ErrorAlert
              key={date}
              message={message}
              onClick={() => this.handleErrorAlertClick(index)}
            />
          ))}
        </div>
      );
    }
  }

  render() {
    const { coefficients, connected, donuts } = this.state;

    return (
      <div className='App'>
        {this.renderErrors()}
        <DonutCoefficientViewer coefficients={coefficients} />
        <DonutViewer donuts={donuts} />
        <div className='App-badge'>
          <ConnectionBadge connected={connected} />
        </div>
      </div>
    );
  }
}

export default DeepFryer;
