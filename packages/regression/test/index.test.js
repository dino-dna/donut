'use strict'

var ava = require('ava').default
var zipObject = require('lodash/zipObject')
var values = require('lodash/values')
var regression = require('../')
var { rater, keys } = require('donut-common')
// var generateDonnies = require('./fixture/generate')

ava('donut regression', async t => {
  var donnies = require('./fixture/donuts.json')
  donnies = donnies.X.map((rawnut, i) => {
    var nut = zipObject(values(keys), rawnut) // generateDonnies(300)
    nut.DONUT_RATING = donnies.Y[i]
    return nut
  })
  var numDonuts = 2
  while (true) {
    var res = await regression(donnies.slice(0, numDonuts))
    ++numDonuts
    var firstRegression = Object.keys(res)[0]
    var perfectDonut = keys.reduce((nut, key, i) => {
      return Object.assign(nut, { [key]: res[firstRegression][i] })
    }, {})
    // t.truthy(perfectDonut.DONUT_FROSTING_COVERAGE)
    var perfectRating = rater.getIndicator(perfectDonut)
    // t.truthy(perfectRating > 0.8)
    console.log(`actual rating: ${perfectRating} // `)
  }
})
