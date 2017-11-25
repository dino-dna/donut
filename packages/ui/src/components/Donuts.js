import { connect } from 'react-redux'
import React, { Component } from 'react'
import DonutList from './DonutList'
import { Link } from 'react-router'
import '../css/Donuts.css'

class Donuts extends Component {
  render () {
    const { donuts } = this.props
    if (!donuts || !donuts.length) {
      return (
        <div className='Donuts Donuts-empty'>
          <h1>We see that you’re very, very, hungry.</h1>
          <span
            aria-label='Donut'
            role='img'
          >
            🍩
          </span>
          <Link
            className='Donuts-link'
            to='/create'
          >
            <span aria-hidden='true'>+</span> New Donuts
          </Link>
        </div>
      )
    }
    return (
      <div className='Donuts Donuts-populated'>
        <h3>Your donuts, your highness…</h3>
        <div>
          <DonutList donuts={donuts} />
        </div>
      </div>
    )
  }
}

export default connect(({ donuts }) => ({ donuts }))(Donuts)
