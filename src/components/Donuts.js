import { connect } from 'react-redux';
import React, { Component } from 'react';
import Donut from './Donut';
import '../css/Donuts.css';

class Donuts extends Component {
  render() {
    const { donuts } = this.props;
    if (!donuts || !donuts.length) {
      return (
        <div>
          <h1>We see that you're very, very, hungry.</h1>
          <p>
            Thanks for stoppin' in.  Head over to the donut "Viewer" and start
            making some tasty donuts!
          </p>
          <span style={{fontSize: '600%'}}>🍩</span>
        </div>
      )
    }

    return (
      <ul className="Donuts">
        {donuts.map((donut, i) => {
          return (
            <li key={i}>
              <Donut {...donut} />
            </li>
          )
        })}
      </ul>
    );
  }
}

export default connect(({ donuts }) => ({ donuts }))(Donuts);
