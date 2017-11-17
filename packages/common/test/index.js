var common = require('../')
var times = require('lodash/times')

var samples = 100
times(samples).forEach(num => {
  var rating = common.rater.rateThickness(num/samples)
  console.log(num, rating)
})
