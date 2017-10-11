'use strict'

const server = require('../src/index.js')
const test = require('ava')

test('Get initial donuts', (t) => server.inject({
  method: 'GET',
  url: '/v1/donuts'
})
  .then(({ result, statusCode }) => {
    t.is(statusCode, 200, 'status code is 200')
    t.deepEqual(result, [], 'returns empty list')
  })
)

test('Rejects bad donuts', (t) => {
  return server.inject({
    method: 'POST',
    payload: {},
    url: '/v1/donuts'
  })
  .then((response) => {
    debugger;
  })
});

