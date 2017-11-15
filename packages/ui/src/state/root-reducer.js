import { combineReducers } from 'redux';
import donut from './ducks/donut';
import donuts from './ducks/donuts';
import submitMode from './ducks/submitMode';
import upload from './ducks/upload';
import { routerReducer } from 'react-router-redux';

export default function get() {
  return combineReducers({
    donut,
    donuts,
    routing: routerReducer,
    submitMode,
    upload,
  });
}
