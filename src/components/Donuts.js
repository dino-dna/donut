import { connect } from 'react-redux';
import React, { Component } from 'react';
import DonutList from './DonutList'
import '../css/Donuts.css';

class Donuts extends Component {
  render() {
    const { donuts } = this.props;
    if (!donuts || !donuts.length) {
      return (
        <div>
          <h1>We see that you're very, very, hungry.</h1>
          <p>
            Thanks for stopping in.  Head over to the donut "Viewer" and start
            making some tasty donuts!
          </p>
          <span style={{fontSize: '600%'}}>🍩</span>
        </div>
      )
    }
    return (
      <div>
        <h3 id='donut_list_header'>Your donuts, your highness...</h3>
        <div>
          <DonutList donuts={donuts} />
        </div>
      </div>
    );
  }
}

export default connect(({ donuts }) => ({ donuts }))(Donuts);
