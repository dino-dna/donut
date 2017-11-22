import React from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../css/Header.css'

const Header = ({ isAdmin }) => {
  const links = [
    ['/', 'Donuts'],
    ['/view', 'Viewer'],
    ['/about', 'About']
  ]

  if (isAdmin) {
    links.push(
      ['/admin', 'Admin'],
      ['/fryer', 'Firehose']
    )
  }

  return (
    <header className='Header' role='banner'>
      <h1>Donut</h1>
      <ul>
        {links.map(([path, name]) => (
          <li key={path}><Link to={path}>{name}</Link></li>
        ))}
      </ul>
    </header>
  )
}

Header.propTypes = {
  isAdmin: bool.isRequired
}

export default connect(({ admin }) => admin)(Header)
