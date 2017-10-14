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

test('Create a donut', (t) => {
  const donut = {
    frosting_coverage: Math.random(),
    frosting_thickness: Math.random(),
    inner_radius: Math.random(),
    outer_radius: Math.random(),
    sprinkle_coverage: Math.random()
  }

  return request.post('/donuts')
    .send(donut)
    .expect(201)
    .then(res => {
      const keys = Object.keys(res.body)

      t.is(keys.length, 1, 'returns map entry')
      t.deepEqual(res.body[keys[0]], donut, 'returns donut object')
    })
})
