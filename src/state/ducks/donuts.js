export const ADD_DONUT = 'ADD_DONUT';

export function addDonut(donut) {
  return {
    donut,
    type: ADD_DONUT,
  }
}

export const REMOVE_DONUT = 'REMOVE_DONUT';

export function removeDonut(index) {
  return {
    index,
    type: REMOVE_DONUT,
  }
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_DONUT:
      return [...state, action.donut];
    case REMOVE_DONUT:
      return state.filter((donut, i) => i !== action.index);
    default:
      return state;
  }
}
