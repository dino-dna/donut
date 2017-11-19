export const DONUT_FROSTING_COVERAGE = 'DONUT_FROSTING_COVERAGE'
export const DONUT_SPRINKLE_COVERAGE = 'DONUT_SPRINKLE_COVERAGE'
export const DONUT_FROSTING_THICKNESS = 'DONUT_FROSTING_THICKNESS'
export const DONUT_INNER_RADIUS = 'DONUT_INNER_RADIUS'
export const DONUT_OUTER_RADIUS = 'DONUT_OUTER_RADIUS'

const SET_DONUT_ATTRIBUTE = 'SET_DONUT_ATTRIBUTE'
export const setDonutAttribute = ({ attribute, value }) => ({ attribute, value, type: SET_DONUT_ATTRIBUTE })

export default function reducer (state = {
  DONUT_FROSTING_COVERAGE: 0.55,
  DONUT_FROSTING_THICKNESS: 1,
  DONUT_SPRINKLE_COVERAGE: 0.75,
  DONUT_INNER_RADIUS: 0.15,
  DONUT_OUTER_RADIUS: 0.75
}, action) {
  switch (action.type) {
    case SET_DONUT_ATTRIBUTE:
      const newValue = parseFloat(action.value, 10)
      switch (action.attribute) {
        case DONUT_FROSTING_COVERAGE:
          return Object.assign({}, state, { [action.attribute]: newValue })
        case DONUT_SPRINKLE_COVERAGE:
          return Object.assign({}, state, { [action.attribute]: newValue })
        case DONUT_FROSTING_THICKNESS:
          return Object.assign({}, state, { [action.attribute]: newValue })
        case DONUT_INNER_RADIUS:
          if (newValue >= state.DONUT_OUTER_RADIUS) {
            return state
          }

          return Object.assign({}, state, { [action.attribute]: newValue })
        case DONUT_OUTER_RADIUS:
          if (newValue <= state.DONUT_INNER_RADIUS) {
            return state
          }

          return Object.assign({}, state, { [action.attribute]: newValue })
        default:
          throw new Error(`invalid attribute provided ${action.attribute}`)
      }
    default:
      return state
  }
}
