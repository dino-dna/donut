import { push } from 'react-router-redux'

export function addDonut(donut) {
  return (dispatch) => {
    dispatch(doAddDonut(donut));
    dispatch(push('/'));
  };
}

export const DO_ADD_DONUT = 'DO_ADD_DONUT';

function doAddDonut(donut) {
  return {
    donut,
    type: DO_ADD_DONUT,
  }
}

export const REMOVE_DONUT = 'REMOVE_DONUT';

export function removeDonut(index) {
  return {
    index,
    type: REMOVE_DONUT,
  }
}


export function updateDonut(index, donut) {
  return dispatch => {
    dispatch(doUpdateDonut(index, donut));
    dispatch(push('/'));
  };
}

const DO_UPDATE_DONUT = 'DO_UPDATE_DONUT';

function doUpdateDonut(index, donut) {
  return {
    donut,
    index,
    type: DO_UPDATE_DONUT,
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case DO_ADD_DONUT:
      return [...state, action.donut];
    case DO_UPDATE_DONUT:
      return state.map((donut, i) => {
        return i === action.index ? action.donut : donut;
      });
    case REMOVE_DONUT:
      return state.filter((donut, i) => i !== action.index);
    default:
      return state;
  }
}
