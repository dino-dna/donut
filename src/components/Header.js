import React, { Component } from 'react';
import '../css/Header.css';

class Header extends Component {
  render() {
    return (
      <header className="Header" role="banner">
        <h1>Donut</h1>
        <ul>
          <li><a href="#">Donuts</a></li>
          <li><a href="#">Viewer</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </header>
    );
  }
}

export default Header;
