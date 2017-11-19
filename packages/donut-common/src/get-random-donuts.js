const times = require('lodash/times')
const keys = require('./keys.js')
const rater = require('./rater.js')

module.exports = function getRandomDonuts (count) {
  return times(count).map(() => {
    const donut = keys.reduce((nut, key) => {
      return Object.assign(nut, { [key]: Math.random() })
    }, {})
    donut['DONUT_RATING'] = rater.getIndicator(donut)
    return donut
  })
}
