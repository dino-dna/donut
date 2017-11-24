import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import '../css/Fade.css'

const Fade = ({ children, timeout, ...props }) => (
  <CSSTransition
    classNames='fade'
    timeout={timeout}
    {...props}
  >
    {children}
  </CSSTransition>
)

Fade.defaultProps = {
  timeout: 750
}

Fade.propTypes = {
  /** Child elements */
  children: PropTypes.element.isRequired,

  /** CSS transition timeout */
  timeout: PropTypes.number
}

export default Fade
