export const DISABLE_ADMIN_MODE = 'DISABLE_ADMIN_MODE'

export const disableAdminMode = () => ({
  payload: null,
  type: DISABLE_ADMIN_MODE
})

export const ENABLE_ADMIN_MODE = 'ENABLE_ADMIN_MODE'

export const enableAdminMode = () => ({
  payload: null,
  type: ENABLE_ADMIN_MODE
})

export const DISABLE_SPRAY = 'DISABLE_SPRAY'

export const disableSpray = () => ({
  payload: null,
  type: DISABLE_SPRAY
})

export const ENABLE_SPRAY = 'ENABLE_SPRAY'

export const enableSpray = () => ({
  payload: null,
  type: ENABLE_SPRAY
})

export const SET_SPRAY = 'SET_SPRAY'

// Private, for setting local state
export const setSpray = (payload) => ({
  payload,
  type: SET_SPRAY
})

const initialState = {
  isAdmin: false,
  isSpray: false
}

export default function reducer (state = initialState, { payload, type }) {
  switch (type) {
    case DISABLE_ADMIN_MODE:
      return {
        ...state,
        isAdmin: false
      }
    case ENABLE_ADMIN_MODE:
      return {
        ...state,
        isAdmin: true
      }
    case SET_SPRAY:
      return {
        ...state,
        isSpray: payload
      }
    default:
      return state
  }
}
