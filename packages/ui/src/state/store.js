import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'

import getRootReducer from './root-reducer'
import socketMiddleware from '../middleware/socket'

const finalCreateStore = applyMiddleware(
  routerMiddleware(hashHistory),
  thunkMiddleware,
  promiseMiddleware,
  socketMiddleware,
  createLogger({ collapsed: true })
)(createStore)

let store

export function configure (initialState) {
  store = finalCreateStore(getRootReducer(), initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./root-reducer', () => store.replaceReducer(getRootReducer()))
  }

  return store
}

export function get () { return store }
