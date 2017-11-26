'use strict'

const { messages, rater } = require('donut-common')
const regression = require('donut-regression')
const http = require('http')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')
const debounce = require('lodash/debounce')
const debug = require('debug')('donut:monster')

const donuts = new Map()
const server = http.createServer()
const port = process.env.PORT || 3001

const io = socketIo(server, {
  serveClient: false
})
io.set('origins', '*:*') // #security.lol
let submitMode = false

const donutsRunner = debounce(
  async () => {
    debug('Running regression with %d donuts', donuts.size)
    const res = await regression(
      Array.from(donuts.values()).map(nut => {
        nut.DONUT_RATING = rater.getIndicator(nut)
        return nut
      })
    )

    debug('Regression results %o', res)
    io.emit(messages.NEW_REGRESSION_RESULTS, res)
  },
  3000,
  {
    maxWait: 3000
  }
)

io.on('connection', (socket) => {
  debug('Client connected %s', socket.id)

  socket.emit(messages.INIT_CLIENT, {
    submitMode
  })
  socket.on(messages.UPLOAD_DONUTS, (newDonuts) => {
    debug('Client %s uploaded %d donuts', socket.id, newDonuts.length)
    if (!submitMode) {
      return socket.emit(messages.UPLOAD_DONUTS, [])
    }

    // TODO: validate, check for pre-existing donuts
    const toEnter = newDonuts.map(donut => ([uuidv4(), donut]))

    for (const [id, donut] of toEnter) {
      donuts.set(id, donut)
    }

    donutsRunner()

    io.emit(messages.DONUT_FIREHOSE, toEnter)
    socket.emit(messages.UPLOAD_DONUTS, toEnter)
  })
  socket.on(messages.SUBMIT_MODE, (newMode) => {
    debug(`Received new submit mode: ${newMode}`)
    submitMode = !!newMode

    io.emit(messages.SUBMIT_MODE, submitMode)
  })
  socket.on('disconnect', (reason) => {
    debug('Client %s disconnected: %s', socket.id, reason)
  })
})

if (!module.parent) {
  server.listen(port, () => {
    console.log(`donut-monster listening on ${server.address().port}`)
  })
}

module.exports = io
