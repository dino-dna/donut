const test = require('ava')
const WebSocket = require('ws')

const app = require('../src/index.js')

const server = app.listen()

const address = `ws://localhost:${server.address().port}/voodoo`

test('Initial message', (t) => new Promise((resolve, reject) => {
  const ws = new WebSocket(address)

  ws.on('error', reject)
  ws.on('message', message => {
    t.truthy(message)
    resolve()
  })
}))
