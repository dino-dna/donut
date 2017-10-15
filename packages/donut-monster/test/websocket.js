const supertest = require('supertest')
const test = require('ava')
const WebSocket = require('ws')

const app = require('../src/index.js')
const { NEW_DONUT } = require('../src/messages')

const server = app.listen()

const address = `ws://localhost:${server.address().port}/voodoo`

test('Initial message', (t) => new Promise((resolve, reject) => {
  const ws = new WebSocket(address)

  ws.on('error', reject)
  ws.on('message', message => {
    t.truthy(message)
    ws.terminate()
    resolve()
  })
}))

test('Broadcasts new donuts', (t) => new Promise((resolve, reject) => {
  const ws = new WebSocket(address)
  const donut = {
    frosting_coverage: Math.random(),
    frosting_thickness: Math.random(),
    inner_radius: Math.random(),
    outer_radius: Math.random(),
    sprinkle_coverage: Math.random()
  }
  let messageCount = 0

  ws.on('close', resolve)
  ws.on('open', () => supertest.agent(server)
    .post('/donuts')
    .send(donut)
    .expect(201)
    .catch(reject)
  )
  ws.on('error', reject)
  ws.on('message', message => {
    if (messageCount === 1) {
      t.deepEqual(
        JSON.parse(message),
        {
          type: NEW_DONUT,
          data: donut
        }
      )
      ws.terminate()
    }
    messageCount++
  })
}))
