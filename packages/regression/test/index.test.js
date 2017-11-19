'use strict'

var ava = require('ava').default
var zipObject = require('lodash/zipObject')
var values = require('lodash/values')
var regression = require('../')
var rater = require('donut-common').rater
// var generateDonnies = require('./fixture/generate')
var keys = require('./fixture/donut-keys')

ava('donut regression', async t => {
  var donnies = require('./fixture/donuts.json')
  donnies = donnies.X.map((rawnut, i) => {
    var nut = zipObject(values(keys), rawnut) // generateDonnies(300)
    nut.DONUT_RATING = donnies.Y[i]
    return nut
  })
  var res = await regression(donnies)
  var firstRegression = Object.keys(res)[0]
  const perfectDonut = keys.reduce((nut, key, i) => {
    return Object.assign(nut, { [key]: res[firstRegression][i] })
  }, {})
  t.truthy(perfectDonut.DONUT_FROSTING_COVERAGE)
  var perfectRating = rater.getIndicator(perfectDonut)
  t.truthy(perfectRating > 0.8)
})
