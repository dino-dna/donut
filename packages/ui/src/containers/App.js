import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ConnectionBadge from '../components/ConnectionBadge'
import Header from '../components/Header'
import '../css/App.css'

const App = ({ children, connected }) => (
  <div className='App'>
    <Header />
    {children}
    <ConnectionBadge connected={connected} />
  </div>
)

App.defaultProps = {
  children: undefined
}

App.propTypes = {
  children: PropTypes.element,
  connected: PropTypes.bool.isRequired
}

export default connect(
  ({
    fryer: { connected }
  }) => ({ connected })
)(App)
