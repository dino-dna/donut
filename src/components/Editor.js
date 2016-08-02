import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Donut from './Donut';
import DonutSettingsController from './DonutSettingsController';
import '../css/Editor.css';
import { random } from 'lodash';

function getRandomDonut() {
  return {
    DONUT_FROSTING_COVERAGE: random(.5, 1),
    DONUT_FROSTING_THICKNESS: random(.4, .9),
    DONUT_SPRINKLE_COVERAGE: random(.3, .6),
    DONUT_INNER_RADIUS: random(.1, .4),
    DONUT_OUTER_RADIUS: random(.4, 1),
  };
}

class Editor extends Component {
  render() {
    const { donut, isNew } = this.props;
    return (
      <div className="Editor">
        <Donut {...donut} />
        <DonutSettingsController donut={donut} isNew={isNew} />
      </div>
    );
  }
}

Editor.propTypes = {
  donut: PropTypes.object.isRequired,
  id: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { params: { id } } = ownProps;

  return id === 'new' ?
    {
      donut: getRandomDonut(),
      id: null,
    } :
    {
      donut: state.donuts.find((donut, index) => index === id),
      id,
    };
}

export default connect(mapStateToProps)(Editor);
