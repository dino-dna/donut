import React from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../css/Header.css'

const Header = ({ isAdmin }) => {
  const links = [
    <Link to='/'>Donuts</Link>,
    <Link to='/about'>About</Link>,
    <Link className='Header-button' to='/create'>New Donut</Link>
  ]

  if (isAdmin) {
    links.splice(
      2,
      0,
      <Link to='/admin'>Admin</Link>,
      <Link to='/fryer'>Firehose</Link>
    )
  }

  return (
    <header className='Header' role='banner'>
      <h1>Donut</h1>
      <ul>
        {links.map((link) => (
          <li key={link.to}>{link}</li>
        ))}
      </ul>
    </header>
  )
}

Header.propTypes = {
  isAdmin: bool.isRequired
}

export default connect(({ admin }) => admin)(Header)
