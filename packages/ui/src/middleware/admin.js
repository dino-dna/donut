/* global window */
import {
  disableAdminMode,
  enableAdminMode
} from '../state/ducks/admin'

export default ({ dispatch, getState }) => next => action => {
  // This is a **hack** to expose admin functionality through the console
  // TODO: Unhack it! Make a button or something.
  if (typeof window && !('__HACKS__' in window)) {
    Object.defineProperty(window, '__HACKS__', {
      get () {
        const { admin: { isAdmin } } = getState()
        if (isAdmin) {
          dispatch(disableAdminMode())
        } else {
          dispatch(enableAdminMode())
        }
      },
      set (value) {
        dispatch(value ? enableAdminMode() : disableAdminMode())
      }
    })
  }

  return next(action)
}
