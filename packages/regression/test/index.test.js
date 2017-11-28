'use strict'

var ava = require('ava').default
var zipObject = require('lodash/zipObject')
var values = require('lodash/values')
var isNumber = require('lodash/isNumber')
var regression = require('../')
var { rater, keys } = require('donut-common')

ava.skip('DEBUG', async t => {
  var donnies = require('./fixture/donuts.json')
  donnies = donnies.X.map((rawnut, i) => {
    var nut = zipObject(values(keys), rawnut)
    nut.DONUT_RATING = donnies.Y[i]
    return nut
  })
  var i = 0
  process.env.DEBUG = false
  while (i < 10) {
    var numDonnies = 20 * (i + 1)
    var { knn: { X_min, donut, score } } = await regression(donnies.slice(0, numDonnies), ['knn'], { Env: [] })
    var rating = rater.getIndicator(donut)
    console.log(`rating: ${rating}, model-score: ${score}, indicies: ${X_min.join(', ')}`)
    ++i
  }
  t.pass('yahtzee')
})

ava.skip('donut regression', async t => {
  var donnies = require('./fixture/donuts.json')
  donnies = donnies.X.map((rawnut, i) => {
    var nut = zipObject(values(keys), rawnut)
    nut.DONUT_RATING = donnies.Y[i]
    return nut
  })
  var { knn: { X_min, donut, score } } = await regression(donnies)
  t.truthy(isNumber(score), 'reports numeric score')
  t.truthy(Array.isArray(X_min), 'provides a set of optimal inputs')
  t.truthy(donut, 'result has donut')
  t.truthy(donut.DONUT_FROSTING_COVERAGE)
  var perfectRating = rater.getIndicator(donut)
  t.truthy(perfectRating > 0.8)
  console.log(`actual rating: ${perfectRating}`)
})
