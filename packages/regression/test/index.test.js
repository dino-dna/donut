'use strict'

var ava = require('ava')
var regression = require('../')
var times = require('lodash/times')

var keys = [
  'DONUT_FROSTING_COVERAGE',
  'DONUT_FROSTING_THICKNESS',
  'DONUT_SPRINKLE_COVERAGE',
  'DONUT_INNER_RADIUS',
  'DONUT_OUTER_RADIUS',
  'DONUT_RATING'
]

ava('donut regression', async t => {
  var donnies = times(100).map(() => {
    return keys.reduce((donut, key) => {
      if (key.match(/RATING/)) donut[key] = 1 + Math.random() / 10
      else if (key.match(/FROSTING_THICKNESS/)) donut[key] = 1 + Math.random() / 10
      else donut[key] = Math.random()
      return donut
    }, {})
  })
  var res = await regression(donnies)
  t.truthy(res.ridge_regression)
})
