import React from 'react'
import { bool } from 'prop-types'

import '../css/ConnectionBadge.css'

const ConnectionBadge = ({ connected }) => {
  const modifier = connected
    ? 'ConnectionBadge-connected'
    : 'ConnectionBadge-disconnected'

  return (
    <div className={`ConnectionBadge ${modifier}`}>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  )
}

ConnectionBadge.propTypes = {
  /** Whether client is connected */
  connected: bool.isRequired
}

export default ConnectionBadge
