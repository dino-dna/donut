import WebSocket from 'ws';

import {
  submitModeError,
  submitModeReceive,
} from '../state/ducks/submitMode';
import { makeRequest } from '../state/utils';

let ws;

export default ({ dispatch, getState }) => next => action => {
  // Hijack the first action to boot
  // TODO: Consider storing WebSocket messages in queue and handling
  // queue message->action here
  if (!ws) {
    const handleError = (error) => {
      console.error(error);
      dispatch(submitModeError(error.message));
    };

    ws = new WebSocket('wss://localhost:3001/voodoo');
    ws.on('open', () => {
      makeRequest({
        endpoint: '/is-submit-mode',
      })
        .then(({ body }) => {
          dispatch(submitModeReceive(body));
        })
        .catch(handleError)
    });
    ws.on('error', handleError);
    ws.on('message', (message) => {
      try {
        const { type } = JSON.parse(message);

        // TODO: Move donut-monster/src/messages.js to common and reference here
        if (type ===  'SUBMIT_ON') {
          dispatch(submitModeReceive(true));
        } else if (type === 'SUBMIT_OFF') {
          dispatch(submitModeReceive(false));
        }
      } catch (error) {
        handleError(error);
      }
    });
  }

  return next(action);
};

