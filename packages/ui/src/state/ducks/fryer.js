// TODO: Move state to somewhere more appropriate

export const FRYER_CONNECTED = 'FRYER_CONNECTED'

export const connected = () => ({
  payload: null,
  type: FRYER_CONNECTED
})

export const FRYER_DISCONNECTED = 'FRYER_DISCONNECTED'

export const disconnected = () => ({
  payload: null,
  type: FRYER_DISCONNECTED
})

export const FRYER_ADD_DONUTS = 'FRYER_ADD_DONUTS'

export const addDonuts = (donuts) => ({
  payload: donuts,
  type: FRYER_ADD_DONUTS
})

export const FRYER_ADD_ERROR = 'FRYER_ADD_ERROR'

export const addError = (error) => ({
  payload: error,
  type: FRYER_ADD_ERROR
})

export const FRYER_REMOVE_ERROR = 'FRYER_REMOVE_ERROR'

export const removeError = (index) => ({
  payload: index,
  type: FRYER_REMOVE_ERROR
})

export const FRYER_SET_MODELS = 'FRYER_SET_MODELS'

export const setModels = (models) => ({
  payload: models,
  type: FRYER_SET_MODELS
})

const initialState = {
  connected: false,
  donuts: [],
  errors: [],
  models: null
}

export default function reducer (state = initialState, { payload, type }) {
  switch (type) {
    case FRYER_CONNECTED:
      return {
        ...state,
        connected: true
      }
    case FRYER_DISCONNECTED:
      return {
        ...state,
        connected: false
      }
    case FRYER_REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter((e, index) => index !== payload)
      }
    case FRYER_ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, payload]
      }
    case FRYER_ADD_DONUTS:
      return {
        ...state,
        donuts: [...state.donuts, ...payload]
      }
    case FRYER_SET_MODELS:
      return {
        ...state,
        models: payload
      }
    default:
      return state
  }
}
