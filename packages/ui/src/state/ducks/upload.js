import { makeRequest } from '../utils';

const __SOOPER_SECRETS__ = 'DONUTS_HAS_UPLOADED';

const getHasUploaded = () => {
  const hasUploaded = localStorage[__SOOPER_SECRETS__];

  if (typeof hasUploaded !== 'string') {
    return false;
  }

  return JSON.parse(hasUploaded);
};

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const uploadRequest = donuts => ({
  data: donuts,
  type: UPLOAD_REQUEST,
});

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const uploadSuccess = () => ({
  type: UPLOAD_SUCCESS,
});

export const UPLOAD_ERROR = 'UPLOAD_ERROR'
export const uploadError = errorMessage => ({
  data: errorMessage,
  type: UPLOAD_ERROR,
});

export const upload = donuts => (dispatch, getState) => {
  dispatch(uploadRequest());

  const { submitMode: { isOn } } = getState();

  if (!isOn) {
    return dispatch(uploadError('Submit mode not on'));
  } else if (getHasUploaded()) {
    return dispatch(uploadError('Already uploaded'));
  }

  return makeRequest({
    data: donuts,
    endpoint: '/donuts',
    method: 'POST',
  })
    .then(() => {
      localStorage[__SOOPER_SECRETS__] = true;
      dispatch(uploadSuccess());
    })
    .catch((error) => {
      console.error(error);
      dispatch(uploadError(error.message));
    });
};

const initialState = {
  errorMessage: null,
  hasUploaded: getHasUploaded(),
  isLoading: false,
};

const reducer = (state = initialState, { data, type }) => {
  switch (type) {
    case UPLOAD_ERROR:
      return Object.assign({}, state, {
        errorMessage: data,
        isLoading: false,
      });
    case UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasUploaded: true,
      });
    default:
      return state;
  }
};

export default reducer;
