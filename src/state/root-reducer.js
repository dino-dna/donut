import { combineReducers } from 'redux';
import donuts from './ducks/donuts';
import { routerReducer } from 'react-router-redux';

export default function get() {
  return combineReducers({
    donuts,
    routing: routerReducer
  });
}
