import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.slim.js';
import { messages } from 'donut-common';

import DonutCoefficientViewer from './DonutCoefficientViewer';
import DonutViewer from './DonutViewer';
import './App.css';

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

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      coefficients: null,
      donuts: [],
      errors: [],
    };
  }

  componentWillMount() {
    const socket = this.socket = io('http://localhost:3001')

    socket.on('error', error => this.handleError);
    socket.on(messages.INIT_CLIENT, console.log)
    socket.on(messages.NEW_DONUTS, (donuts) => {
      this.setState({
        ...this.state,
        donuts: [...this.state.donuts, ...donuts.map(toProps)]
      });
    });
    socket.on(messages.NEW_COEFFICIENTS, (coefficients) => {
      this.setState({
        ...this.state,
        coefficients: toProps(coefficients)
      });
    });
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
      donuts: this.state.donuts,
      errors: this.state.errors.concat(error),
    });
  }

  renderErrors() {
    const { errors } = this.state;

    if (errors.length) {
      return (
        <div className="App-errors">
          {errors.map(({ date, message }) => (
            <div className="App-errors-item" key={date}>
              {message}
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    const { coefficients, donuts } = this.state;

    return (
      <div className="App">
        {this.renderErrors()}
        <DonutCoefficientViewer coefficients={coefficients} />
        <DonutViewer donuts={donuts} />
      </div>
    );
  }
}

export default App;
