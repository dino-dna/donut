const supertest = require('supertest')
const test = require('ava')
const WebSocket = require('ws')

const { SUBMIT_OFF } = require('../src/messages.js')

const app = require('../src/index.js')
const server = app.listen()
const request = supertest(server)

test.serial('Get submit mode', (t) =>
  request.get('/is-submit-mode')
    .expect(200)
    .then(({ body }) => {
      t.false(body)
    })
)

test.serial('Turn it on', (t) =>
  request.post('/is-submit-mode')
    .then(({ body }) => {
      t.true(body, 'returns true')

      return request.get('/is-submit-mode')
    })
    .then(({ body }) => {
      t.true(body, 'sets to true')
    })
)

test.serial('Broadcasts it', (t) => new Promise((resolve, reject) => {
  const ws = new WebSocket(`ws://localhost:${server.address().port}/voodoo`)
  let messageCount = 0

  ws.on('close', resolve)
  ws.on('error', reject)
  ws.on('message', message => {
    if (messageCount > 0) {
      t.is(JSON.parse(message).type, SUBMIT_OFF)
      ws.terminate()
    }

    messageCount++
  })

  ws.on('open', () =>
    request.delete('/is-submit-mode').catch(reject)
  )
}))
