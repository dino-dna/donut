import React, { Component } from 'react';
import '../css/Donut.css'

export default class Donut extends Component {
  render() {
    return (
      <div className="Donut">
        <svg viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={50} fill="#efcc9a" stroke="#20426a" stroke-width="10" />
          <circle cx={50} cy={50} r={10} fill="white" stroke="#20426a" stroke-width="10" />
        </svg>
      </div>
    );
  }
}
