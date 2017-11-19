'use strict'

var ava = require('ava').default
var zipObject = require('lodash/zipObject')
var values = require('lodash/values')
var isNumber = require('lodash/isNumber')
var regression = require('../')
var { rater, keys } = require('donut-common')

ava('donut regression', async t => {
  var donnies = require('./fixture/donuts.json')
  donnies = donnies.X.map((rawnut, i) => {
    var nut = zipObject(values(keys), rawnut) // generateDonnies(300)
    nut.DONUT_RATING = donnies.Y[i]
    return nut
  })
  var numDonuts = 5000
  var { ridge_regression_with_sim_ann: { X_min, donut, score } } = await regression(donnies.slice(0, numDonuts))
  t.truthy(isNumber(score), 'reports numeric score')
  t.truthy(Array.isArray(X_min), 'provides a set of optimal inputs')
  t.truthy(donut, 'result has donut')
  t.truthy(donut.DONUT_FROSTING_COVERAGE)
  var perfectRating = rater.getIndicator(donut)
  t.truthy(perfectRating > 0.8)
  console.log(`actual rating: ${perfectRating} // `)
})
