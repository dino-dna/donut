import getPort from 'get-port'
import socketIoClient from 'socket.io-client'
import test from 'ava'
import { getRandomDonuts, messages } from 'donut-common'
import { promisify } from 'util'

import io from '../src/index.js'

const getClient = () => socketIoClient(`http://localhost:${io.httpServer.address().port}`)

test.before(async () => {
  const port = await getPort()
  return promisify(io.httpServer.listen.bind(io.httpServer))(port)
})

test.serial('initial connection state', (t) => new Promise((resolve, reject) => {
  const client = getClient()

  client.on(messages.INIT_CLIENT, ({ submitMode }) => {
    t.false(submitMode, 'submit mode initially off')
    resolve()
  })
  client.on('disconnect', reject)
  client.on('error', reject)
}))

// Test is stateful
test.serial('submit mode', (t) => new Promise((resolve, reject) => {
  const client = getClient()

  client.on(messages.SUBMIT_MODE, (submitMode) => {
    t.true(submitMode, 'sets submit mode')
    resolve()
  })
  client.emit(messages.SUBMIT_MODE, true)

  client.on('disconnect', reject)
  client.on('error', reject)
}))

// Actually computes regression, this one takes a while
test.serial('uploads donuts', (t) => new Promise((resolve, reject) => {
  const client = getClient()
  const donuts = getRandomDonuts(10)
  const resolveSometime = () => {
    if (++resolveSometime.count > 2) resolve()
  }
  resolveSometime.count = 0

  client.on(messages.UPLOAD_DONUTS, (response) => {
    t.deepEqual(
      response.map(([id, nut]) => nut),
      donuts,
      'returns uploaded donuts'
    )
    resolveSometime()
  })
  client.on(messages.DONUT_FIREHOSE, (response) => {
    t.deepEqual(
      response.map(([id, nut]) => nut),
      donuts,
      'broadcasts uploaded donuts'
    )
    resolveSometime()
  })
  client.on(messages.NEW_REGRESSION_RESULTS, (results) => {
    t.truthy(results, 'returns regression')
    resolveSometime()
  })

  client.emit(messages.UPLOAD_DONUTS, donuts)

  client.on('disconnect', reject)
  client.on('error', reject)
}))

test.after(async () => promisify(io.close.bind(io))())
