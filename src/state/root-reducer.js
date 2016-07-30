import { combineReducers } from 'redux';
import donut from './ducks/donut';
import { routerReducer } from 'react-router-redux';

export default function get() {
  return combineReducers({
    donut,
    routing: routerReducer
  });
}
