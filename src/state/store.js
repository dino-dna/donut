import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import getRootReducer from './root-reducer';

const finalCreateStore = applyMiddleware(
  routerMiddleware(browserHistory),
  thunkMiddleware,
  promiseMiddleware,
  createLogger({ collapsed: true })
)(createStore);

let store;

export function configure(initialState) {
  store = finalCreateStore(getRootReducer(), initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./root-reducer', () => store.replaceReducer(getRootReducer()));
  }

  return store;
}

export function get() { return store; }
