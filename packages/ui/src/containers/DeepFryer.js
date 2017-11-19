import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConnectionBadge from '../components/ConnectionBadge';
import DonutPredictionViewer from '../components/DonutPredictionViewer';
import DonutViewer from '../components/DonutViewer';
import ErrorAlert from '../components/ErrorAlert';
import { removeError } from '../state/ducks/fryer';
import '../css/DeepFryer.css';

const DeepFryer = ({
  connected,
  donuts,
  errors,
  models,
  onErrorClick,
}) => {
  const errorsComponent = errors.length ?
    (
      <div className='DeepFryer-errors'>
        {errors.map(({ date, message }, index) => (
          <ErrorAlert
            key={date}
            message={message}
            onClick={() => onErrorClick(index)}
          />
        ))}
      </div>
    ) :
    undefined;

  return (
    <div className='DeepFryer'>
      {errorsComponent}
      <DonutPredictionViewer models={models} />
      <DonutViewer donuts={donuts} />
      <div className='DeepFryer-badge'>
        <ConnectionBadge connected={connected} />
      </div>
    </div>
  );
};

DeepFryer.defaultProps = {
  models: undefined,
};

DeepFryer.propTypes = {
  connected: PropTypes.bool.isRequired,
  donuts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  models: PropTypes.shape({
    ridge_regression_with_sim_ann: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onErrorClick: PropTypes.func.isRequired,
};

export default connect(
  ({ fryer }) => fryer,
  {
    onErrorClick: removeError,
  }
)(DeepFryer);