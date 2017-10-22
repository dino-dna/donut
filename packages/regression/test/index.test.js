'use strict'

var ava = require('ava')
var regression = require('../')
var times = require('lodash/times')
var { rater } = require('donut-common')

var keys = [
  'DONUT_FROSTING_COVERAGE',
  'DONUT_FROSTING_THICKNESS',
  'DONUT_SPRINKLE_COVERAGE',
  'DONUT_INNER_RADIUS',
  'DONUT_OUTER_RADIUS'
]

ava('donut regression', async t => {
  var donnies = times(300).map(() => {
    const donut = keys.reduce((nut, key) => {
      return Object.assign(nut, { [key]: Math.random() })
    }, {})
    donut['DONUT_RATING'] = rater.getIndicator(donut)
    return donut
  })
  var res = await regression(donnies)
  const perfectDonut = keys.reduce((nut, key, i) => {
    return Object.assign(nut, { [key]: res.ridge_regression[i] })
  }, {})
  perfectDonut['DONUT_RATING'] = rater.getIndicator(perfectDonut)
  t.truthy(res.ridge_regression)
})
