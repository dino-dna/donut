import React from 'react'
import { storiesOf } from '@storybook/react'
import Welcome from './Welcome'

export default storiesOf('Welcome', module)
.add('to donut', () => <Welcome />)
