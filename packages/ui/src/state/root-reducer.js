import { combineReducers } from 'redux'
import admin from './ducks/admin'
import donut from './ducks/donut'
import donuts from './ducks/donuts'
import submitMode from './ducks/submitMode'
import upload from './ducks/upload'
import { routerReducer } from 'react-router-redux'
import fryer from './ducks/fryer'

export default function get () {
  return combineReducers({
    admin,
    donut,
    donuts,
    fryer,
    routing: routerReducer,
    submitMode,
    upload
  })
}
