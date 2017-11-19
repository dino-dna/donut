import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../css/Header.css'

class Header extends Component {
  render () {
    return (
      <header className='Header' role='banner'>
        <h1>Donut</h1>
        <ul>
          <li><Link to={`/`}>Donuts</Link></li>
          <li><Link to={`/view`}>Viewer</Link></li>
          <li><Link to={`/about`}>About</Link></li>
        </ul>
      </header>
    )
  }
}

export default connect()(Header)
