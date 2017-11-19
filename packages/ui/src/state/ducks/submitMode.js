// TODO: Rename action creator
export const SUBMIT_MODE_REQUEST = 'SUBMIT_MODE_REQUEST'
export const submitModeRequest = payload => ({
  payload,
  type: SUBMIT_MODE_REQUEST
})

export const SUBMIT_MODE_RECEIVE = 'SUBMIT_MODE_RECEIVE'
export const submitModeReceive = payload => ({
  payload,
  type: SUBMIT_MODE_RECEIVE
})

export const SUBMIT_MODE_ERROR = 'SUBMIT_MODE_ERROR'
export const submitModeError = errorMessage => ({
  payload: errorMessage,
  type: SUBMIT_MODE_ERROR
})

const initialState = {
  errorMessage: null,
  isOn: false,
  loading: false
}

export default function reducer (state = initialState, { payload, type }) {
  switch (type) {
    case SUBMIT_MODE_REQUEST:
      return {
        errorMessage: null,
        isOn: state.isOn,
        loading: true
      }
    case SUBMIT_MODE_RECEIVE:
      return {
        errorMessage: null,
        isOn: payload,
        loading: false
      }
    case SUBMIT_MODE_ERROR:
      return {
        errorMessage: payload,
        isOn: state.isOn,
        loading: false
      }
    default:
      return state
  }
};
