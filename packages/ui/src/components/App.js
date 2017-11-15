import React, { Component } from 'react';
import Header from './Header';
import Upload from './Upload'
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        { this.props.children }
        <Upload />
      </div>
    );
  }
}

export default App;
