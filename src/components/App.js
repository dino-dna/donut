import React, { Component } from 'react';
import Donuts from './Donuts';
import Header from './Header';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Donuts />
      </div>
    );
  }
}

export default App;
