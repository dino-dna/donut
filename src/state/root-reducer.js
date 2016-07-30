import { combineReducers } from 'redux';
import donut from './ducks/donut';

export default function get() {
  return combineReducers({
    donut
  });
}
