'use strict'

var ava = require('ava')
var regression = require('../')
var { getRandomDonuts, keys, rater } = require('donut-common')

ava('donut regression', async t => {
  var donnies = getRandomDonuts(300)
  var res = await regression(donnies)
  const perfectDonut = keys.reduce((nut, key, i) => {
    return Object.assign(nut, { [key]: res.ridge_regression[i] })
  }, {})
  perfectDonut['DONUT_RATING'] = rater.getIndicator(perfectDonut)
  t.truthy(res.ridge_regression)
})
