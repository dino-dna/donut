'use strict'

const { messages } = require('donut-common')
const http = require('http')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')

const donuts = new Map()
const server = http.createServer()
const port = process.env.PORT || 3001

const io = socketIo(server, {
  serveClient: false
})
let submitMode = false

io.on('connection', (socket) => {
  socket.emit(messages.INIT_CLIENT, {
    submitMode
  })
  socket.on(messages.UPLOAD_DONUTS, (newDonuts) => {
    if (!submitMode) {
      return socket.emit(messages.UPLOAD_DONUTS, [])
    }

    // TODO: validate, check for pre-existing donuts
    const toEnter = newDonuts.map(donut => ([uuidv4(), donut]))

    for (const [id, donut] of toEnter) {
      donuts.set(id, donut)
    }

    socket.emit(messages.UPLOAD_DONUTS, toEnter)
  })
  socket.on(messages.SUBMIT_MODE, (newMode) => {
    submitMode = !!newMode

    io.emit(messages.SUBMIT_MODE, submitMode)
  })
})

if (!module.parent) {
  server.listen(port, () => {
    console.log(`donut-monster listening on ${server.address().port}`)
  })
}

module.exports = io
