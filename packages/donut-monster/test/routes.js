const test = require('ava')
const supertest = require('supertest')
const uuidv4 = require('uuid/v4')

const app = require('../src/index.js')
const request = supertest.agent(app.listen())

const donuts = Array.from(Array(3)).map(() => ({
  frosting_coverage: Math.random(),
  frosting_thickness: Math.random(),
  inner_radius: Math.random(),
  outer_radius: Math.random(),
  sprinkle_coverage: Math.random()
}))

const getAll = () => request.get('/donuts').expect(200)

test.serial('Root response', (t) =>
  request.get('/')
    .expect(200)
    .then(res => {
      t.truthy(res.body)
    })
)

test.serial('Initially zero donuts', (t) =>
   getAll().then(({ body }) => t.deepEqual(body, {}))
)

test.serial('Create donuts', (t) =>
  Promise.all(donuts.map(
    donut => request.post('/donuts').send(donut).expect(201)
  ))
    .then(responses => t.deepEqual(
      // Should probably just lodash :-|
      responses.reduce(
        (gimme, { body }) => gimme.concat(Object.values(body)),
        []
      ),
      donuts
    ))
)

test.serial('Returns all donuts', (t) =>
  getAll().then(({ body }) => {
    t.deepEqual(Object.values(body), donuts)
  })
)

test('Fails on bad ID', (t) =>
  request.get(`/donuts/${uuidv4()}`)
    .expect(404)
    .then(() => t.pass()) // ava needs >=1 assertion
)

// Also tests insertion order
test('Returns on good ID', (t) =>
  getAll()
    .then(({ body }) => {
      const id = Object.keys(body)[0]

      return Promise.all([
        request.get(`/donuts/${id}`).expect(200),
        id
      ])
    })
    .then(([{ body }, id]) => t.deepEqual(
      body,
      {
        [id]: donuts[0]
      }
    ))
)
