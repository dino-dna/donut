'use strict'

var times = require('lodash/times')
var keys = require('./donut-keys')
var rater = require('common').rater

function generateDonnies (numDonnies) {
  var donnies = times(numDonnies).map(() => {
    const valuesOnlyDonut = []
    const donut = keys.reduce((nut, key) => {
      const value = Math.random()
      // TERRIBLE EVIL SIDE EFFECT WARNING 👹
      valuesOnlyDonut.push(value)
      return Object.assign(nut, { [key]: value })
    }, {})
    const rating = rater.getIndicator(donut)
    donut['DONUT_RATING'] = rating
    return donut
  })
  return donnies
}

module.exports = generateDonnies

if (!module.parent) {
  var donnies = generateDonnies(300)
  var regressionReadyDonnies = {
    X: [],
    Y: []
  }
  donnies.forEach(donut => {
    var donnieValues = []
    for (var i in keys) {
      donnieValues.push(donut[keys[i]])
    }
    regressionReadyDonnies.X.push(donnieValues)
    regressionReadyDonnies.Y.push(donut.DONUT_RATING)
  })
  require('fs').writeFileSync('donuts.json', JSON.stringify(regressionReadyDonnies, null, 2))
}
