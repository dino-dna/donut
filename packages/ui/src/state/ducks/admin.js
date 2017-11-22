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

const initialState = {
  isAdmin: false
}

export default function reducer (state = initialState, { payload, type }) {
  switch (type) {
    case DISABLE_ADMIN_MODE:
      return {
        isAdmin: false
      }
    case ENABLE_ADMIN_MODE:
      return {
        isAdmin: true
      }
    default:
      return state
  }
}
