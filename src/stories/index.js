import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Donut from '../components/Donut';
import { host } from 'storybook-host';

import '../index.css'
import '../css/App.css'
import '../css/Donut.css'
storiesOf('Donut', module)
  .addDecorator(host({
    title: 'uhhh',
    align: 'center center',
    height: '80%',
    width: '80%'
  }))
  .add('with text', () => {
    const props = {
      DONUT_FROSTING_COVERAGE: 0.8,
      DONUT_FROSTING_THICKNESS: 0.8,
      DONUT_INNER_RADIUS: 0.5,
      DONUT_OUTER_RADIUS: 0.9,
      DONUT_SPRINKLE_COVERAGE: 0.5
    }
    return <Donut {...props} />
  });
