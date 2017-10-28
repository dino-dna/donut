import React, { Component } from 'react';
import WebSocket from 'ws';

import DonutCoefficientViewer from './DonutCoefficientViewer';
import DonutViewer from './DonutViewer';
import './App.css';

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
    const ws = this.ws = new WebSocket('ws://localhost:3001/voodoo');

    ws.on('error', error => this.handleError);
    ws.on('message', (message) => {
      try {
        const { data, type } = JSON.parse(message);

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

        if (type === 'NEW_DONUTS') {
          this.setState({
            ...this.state,
            donuts: [...this.state.donuts, ...data.map(toProps)]
          });
        } else if (type === 'NEW_COEFFICIENTS') {
          this.setState({
            ...this.state,
            coefficients: toProps(data)
          });
        }
      } catch (error) {
        this.handleError(error);
      }
    });
  }

  componentWillUnmount() {
    this.ws.once('close', () => {
      delete this.ws;
    });
    this.ws.terminate();
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
