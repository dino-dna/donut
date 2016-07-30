export const DONUT_FROSTING_COVERAGE = 'DONUT_FROSTING_COVERAGE'
export const DONUT_SPRINKLE_COVERAGE = 'DONUT_SPRINKLE_COVERAGE'
export const DONUT_FROSTING_THICKNESS = 'DONUT_FROSTING_THICKNESS'
export const DONUT_INNER_RADIUS = 'DONUT_INNER_RADIUS'
export const DONUT_OUTER_RADIUS = 'DONUT_OUTER_RADIUS'

const SET_DONUT_ATTRIBUTE = 'SET_DONUT_ATTRIBUTE';
export const setDonutAttritube = ({ attribute, value }) => ({ attribute, value, type: SET_DONUT_ATTRIBUTE });

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_DONUT_ATTRIBUTE:
      switch (action.attribute) {
        case DONUT_FROSTING_COVERAGE:
          return Object.assign({}, state, { [action.attribute]: action.value });
        case DONUT_SPRINKLE_COVERAGE:
          return Object.assign({}, state, { [action.attribute]: action.value });
        case DONUT_FROSTING_THICKNESS:
          return Object.assign({}, state, { [action.attribute]: action.value });
        case DONUT_INNER_RADIUS:
          return Object.assign({}, state, { [action.attribute]: action.value });
        case DONUT_OUTER_RADIUS:
          return Object.assign({}, state, { [action.attribute]: action.value });
        default:
          throw new Error(`invalid attribute provided ${action.attribute}`);
      }
    default:
      return state;
  }
}
