const test = require('ava')
const supertest = require('supertest')

const app = require('../src/index.js')
const request = supertest.agent(app.listen())

test('Root response', (t) =>
 request.get('/')
  .expect(200)
  .then(res => {
    t.truthy(res.body)
  })
)
