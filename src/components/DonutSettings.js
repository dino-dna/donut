import React, { Component } from 'react';

class DonutSettings extends Component {
  render() {
    const { donut } = this.props;
    return <pre>{donut ? JSON.stringify(donut, null, 2) : 'no donut :('}</pre>
  }
}

DonutSettings.displayName = 'DonutSettings';

export default DonutSettings;