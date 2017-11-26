import React from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../css/Header.css'

const Header = ({ isAdmin }) => {
  const links = [
    <Link
      activeClassName='is-active'
      onlyActiveOnIndex
      to='/'
    >
      Donuts
    </Link>,
    <Link
      activeClassName='is-active'
      to='/about'
    >
      About
    </Link>,
    <Link
      activeClassName='is-active'
      className='Header-button'
      to='/create'
    >
      <span aria-hidden='true'>+</span> New Donut
    </Link>
  ]

  if (isAdmin) {
    links.splice(
      2,
      0,
      <Link
        activeClassName='is-active'
        to='/admin'
      >
        Admin
      </Link>,
      <Link
        activeClassName='is-active'
        to='/fryer'
      >
        Firehose
      </Link>
    )
  }

  return (
    <header className='Header' role='banner'>
      <ul>
        {links.map((link) => (
          <li key={link.props.to}>{link}</li>
        ))}
      </ul>
    </header>
  )
}

Header.propTypes = {
  isAdmin: bool.isRequired
}

export default connect(({ admin }) => admin)(Header)
