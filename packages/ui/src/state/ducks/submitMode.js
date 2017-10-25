import { makeRequest } from '../utils';

export const SUBMIT_MODE_REQUEST = 'SUBMIT_MODE_REQUEST';
export const submitModeRequest = () => ({
  type: SUBMIT_MODE_REQUEST,
})

export const SUBMIT_MODE_RECEIVE = 'SUBMIT_MODE_RECEIVE';
export const submitModeReceive = data => ({
  data,
  type: SUBMIT_MODE_RECEIVE,
});

export const SUBMIT_MODE_ERROR = 'SUBMIT_MODE_ERROR';
export const submitModeError = errorMessage => ({
  data: errorMessage,
  type: SUBMIT_MODE_ERROR,
});

export const getSubmitMode = () => dispatch => {
  dispatch(submitModeRequest())

  return makeRequest({
    endpoint: '/is-submit-mode',
  })
    .then(json => dispatch(submitModeReceive(json)))
    .catch((error) => {
      console.error(error);
      dispatch(submitModeError(error.message));
    })
};

export const toggleSubmitMode = () => (dispatch, getState) => {
  dispatch(submitModeRequest());

  const { submitMode: { isOn } } = getState();

  return Promise.all([
    makeRequest({
      endpoint: '/is-submit-mode',
      method: isOn ? 'DELETE' : 'POST',
    }),
    // Show spinner for a bit:
    new Promise(resolve => setTimeout(resolve, 750)),
  ])
    .then(([json]) => dispatch(submitModeReceive(json)))
    .catch((error) => {
      console.error(error);
      dispatch(submitModeError(error.message));
    });
};

const initialState = {
  errorMessage: null,
  isOn: false,
  loading: false,
};

export default function reducer(state = initialState, { data, type }) {
  switch (type) {
    case SUBMIT_MODE_REQUEST:
      return {
        errorMessage: null,
        isOn: state.isOn,
        loading: true,
      };
    case SUBMIT_MODE_RECEIVE:
      return {
        errorMessage: null,
        isOn: data,
        loading: false,
      };
    case SUBMIT_MODE_ERROR:
      return {
        errorMessage: data,
        isOn: state.isOn,
        loading: false,
      };
    default:
      return state;
  }
};
