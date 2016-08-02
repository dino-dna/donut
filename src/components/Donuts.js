import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Donut from './Donut';
import '../css/Donuts.css';

class Donuts extends Component {
  render() {
    const { donuts } = this.props;

    return (
      <ul className="Donuts">
        {donuts.map((donut, i) => {
          return (
            <li key={i}>
              <Link to={`/donuts/${i}`}>
                <Donut {...donut} />
              </Link>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default connect(({ donuts }) => ({ donuts }))(Donuts);
