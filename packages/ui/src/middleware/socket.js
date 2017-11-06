import io from 'socket.io-client/dist/socket.io.slim.js';
import { messages } from 'donut-common';
import {
  SUBMIT_MODE_REQUEST,
  submitModeError,
  submitModeReceive,
} from '../state/ducks/submitMode';

import {
  UPLOAD_REQUEST,
  uploadSuccess,
} from '../state/ducks/upload';

let socket;

export default ({ dispatch, getState }) => next => action => {
  // Hijack the first action to boot
  // TODO: Consider storing WebSocket messages in queue and handling
  // queue message->action here
  if (!socket) {
    const handleError = (error) => {
      console.error(error);
      dispatch(submitModeError(error.message));
    };

    socket = io('http://localhost:3001');
    socket.on(messages.INIT_CLIENT, ({ submitMode }) => {
      dispatch(submitModeReceive(submitMode));
    });
    socket.on('error', handleError)
    socket.on(messages.SUBMIT_MODE, (newMode) =>  {
      dispatch(submitModeReceive(newMode));
    });
    socket.on(messages.UPLOAD_DONUTS, () => {
      dispatch(uploadSuccess());
    })
  }

  if (action.type === SUBMIT_MODE_REQUEST) {
    socket.emit(
      messages.SUBMIT_MODE,
      action.payload
    );
  } else if (action.type === UPLOAD_REQUEST) {
    socket.emit(
      messages.UPLOAD_DONUTS,
      action.payload
    );
  }

  return next(action);
};

