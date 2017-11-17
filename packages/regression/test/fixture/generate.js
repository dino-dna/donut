'use strict'

var times = require('lodash/times')
var shuffle = require('lodash/shuffle')
var { rater, keys } = require('donut-common')
var debug = require('debug')('donut:regression:test')

function generateDonut () {
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
}

function generateDonnies (numDonnies) {
  var donnies = times(numDonnies).map(generateDonut)
  var percentGoodDonnies = 0
  while (percentGoodDonnies < 0.2) {
    donnies.shift()
    var newDonut = generateDonut()
    while (rater.getIndicator(newDonut) < 0.8) {
      newDonut = generateDonut()
    }
    donnies.push(newDonut)
    var numScoring80Plus = donnies.reduce(
      (agg, donut) => {
        var score = rater.getIndicator(donut)
        if (score >= 0.8) ++agg
        return agg
      },
      0
    )
    percentGoodDonnies = numScoring80Plus / donnies.length
    debug(percentGoodDonnies)
  }
  return shuffle(donnies)
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
