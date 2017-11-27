import io from 'socket.io-client/dist/socket.io.slim.js'
import messages from 'donut-common/src/messages'
import {
  SUBMIT_MODE_REQUEST,
  submitModeError,
  submitModeReceive
} from '../state/ducks/submitMode'

import {
  UPLOAD_REQUEST,
  uploadSuccess
} from '../state/ducks/upload'

import {
  addDonuts,
  connected,
  disconnected,
  setModels
} from '../state/ducks/fryer'

let socket

export default ({ dispatch, getState }) => next => action => {
  // Hijack the first action to boot
  // TODO: Consider storing WebSocket messages in queue and handling
  // queue message->action here
  if (!socket) {
    const handleError = (error) => {
      console.error(error)
      dispatch(submitModeError(error.message))
    }

    socket = io(
      process.env.REACT_APP_HOST
        ? process.env.REACT_APP_HOST
        : 'http://localhost:3001'
    )
    socket.on('connect', () => dispatch(connected()))
    socket.on('disconnect', () => dispatch(disconnected()))
    socket.on(messages.INIT_CLIENT, ({ submitMode }) => {
      dispatch(submitModeReceive(submitMode))
    })
    socket.on('error', handleError)
    socket.on(messages.SUBMIT_MODE, (newMode) => {
      dispatch(submitModeReceive(newMode))
    })
    socket.on(messages.DONUT_FIREHOSE, (donuts) => {
      dispatch(addDonuts(donuts))
    })
    socket.on(messages.UPLOAD_DONUTS, () => {
      dispatch(uploadSuccess())
    })

    // TODO: Only listen for new results in an 'admin' mode
    socket.on(messages.NEW_REGRESSION_RESULTS, (models) => {
      dispatch(setModels(models))
    })
  }

  if (action.type === SUBMIT_MODE_REQUEST) {
    socket.emit(
      messages.SUBMIT_MODE,
      action.payload
    )
  } else if (action.type === UPLOAD_REQUEST) {
    socket.emit(
      messages.UPLOAD_DONUTS,
      action.payload
    )
  }

  return next(action)
}
