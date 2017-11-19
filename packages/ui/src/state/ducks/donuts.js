/* global localStorage */
import { push } from 'react-router-redux'

export function addDonut (donut) {
  return (dispatch) => {
    dispatch(doAddDonut(donut))
    dispatch(push('/'))
  }
}

export const DO_ADD_DONUT = 'DO_ADD_DONUT'

function doAddDonut (donut) {
  return {
    donut,
    type: DO_ADD_DONUT
  }
}

export const REMOVE_DONUT = 'REMOVE_DONUT'

export function removeDonut (index) {
  return {
    index,
    type: REMOVE_DONUT
  }
}

function getDonuts () {
  return JSON.parse(localStorage.getItem('DONUTS')) || []
}

function setDonuts (donuts) {
  localStorage.setItem('DONUTS', JSON.stringify(donuts))
  return donuts
}

export default function reducer (state = null, action) {
  state = state || getDonuts()
  switch (action.type) {
    case DO_ADD_DONUT:
      return setDonuts([...state, action.donut])
    case REMOVE_DONUT:
      return setDonuts(state.filter((donut, i) => i !== action.index))
    default:
      return state
  }
}
