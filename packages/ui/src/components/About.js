import React, { Component } from 'react'
import '../css/About.css'

export default class About extends Component {
  render () {
    return (
      <div className='About'>
        <h1>About</h1>
        <h2>What is it?</h2>
        <p>
          Donut™ is all about generating donuts.  It's also about sharing donuts!
          Of course, it wouldn't be worth much if you couldn't import or export
          donuts either!  So, fear not, Donut is here to meet all of your donuty
          needs.
        </p>
        <a
          className='About-link'
          href='https://github.com/dino-dna/donut'
        >
          Source code on GitHub
        </a>
        <h2>Who made it?</h2>
        <p>
          So glad you asked.
        </p>
        <div className='About-profiles'>
          <figure className='About-profile'>
            <a
              className='About-link'
              href='https://github.com/swashcap/'
            >
              <img
                alt='swashcap avatar'
                src='https://avatars0.githubusercontent.com/u/1858316'
              />
              <figcaption>swashcap</figcaption>
            </a>
          </figure>
          <figure className='About-profile'>
            <a
              className='About-link'
              href='https://github.com/cdaringe/'
            >
              <img
                alt='cdaringe avatar'
                src='https://avatars2.githubusercontent.com/u/1003261'
              />
              <figcaption>cdaringe</figcaption>
            </a>
          </figure>
        </div>
      </div>
    )
  }
}
