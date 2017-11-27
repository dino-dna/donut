'use strict'

const { getRandomDonuts, messages, rater } = require('donut-common')
const regression = require('donut-regression')
const http = require('http')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')
const debug = require('debug')('donut:monster')

const donuts = new Map()
const server = http.createServer()
const port = process.env.PORT || 3001

const io = socketIo(server, {
  serveClient: false
})
io.set('origins', '*:*') // #security.lol
let isMakingRegression = false
let spray
let submitMode = false

const donutsRunner = async function () {
  if (isMakingRegression) {
    return
  }

  const donutsCount = donuts.size

  debug('Running regression with %d donuts', donutsCount)
  isMakingRegression = true

  const res = await regression(
    Array.from(donuts.values()).map(nut => {
      nut.DONUT_RATING = rater.getIndicator(nut)
      return nut
    })
  )

  debug('Regression results %o', res)
  io.emit(messages.NEW_REGRESSION_RESULTS, res)
  isMakingRegression = false

  if (donuts.size > donutsCount) return donutsRunner()
}

const addDonutsToStore = (newDonuts) => {
  // TODO: validate, check for pre-existing donuts
  const toEnter = newDonuts.map(donut => ([uuidv4(), donut]))

  for (const [id, donut] of toEnter) {
    donuts.set(id, donut)
  }

  io.emit(messages.DONUT_FIREHOSE, toEnter)

  donutsRunner() // Re-compute regression on every addition

  return toEnter
}

io.on('connection', (socket) => {
  debug('Client connected %s', socket.id)

  socket.emit(messages.INIT_CLIENT, {
    isSpray: !!spray,
    submitMode
  })
  socket.on(messages.UPLOAD_DONUTS, (newDonuts) => {
    debug('Client %s uploaded %d donuts', socket.id, newDonuts.length)
    if (!submitMode) {
      return socket.emit(messages.UPLOAD_DONUTS, [])
    }

    // TODO: validate, check for pre-existing donuts
    const toEnter = addDonutsToStore(newDonuts)

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
  socket.on(messages.DONUT_FIREHOSE_SPRAY_ON, () => {
    if (submitMode) {
      debug('Beginning firehose spray')
      io.emit(messages.DONUT_FIREHOSE_SPRAY, { isSpray: true })
      spray = setInterval(() => {
        const donutCount = 10
        let newDonuts = []

        // Generate 20% good donuts
        while (newDonuts.length < Math.floor(donutCount * 0.2)) {
          const donut = getRandomDonuts(1)[0]
          if (donut.DONUT_RATING > 0.9) {
            newDonuts.push(donut)
          }
        }

        // Backfill with 80% random donuts
        newDonuts = newDonuts.concat(getRandomDonuts(Math.floor(donutCount * 0.8)))

        addDonutsToStore(newDonuts)
      }, 1000)
    }
  })
  socket.on(messages.DONUT_FIREHOSE_SPRAY_OFF, () => {
    debug('Stopping firehose spray')
    io.emit(messages.DONUT_FIREHOSE_SPRAY, { isSpray: false })
    clearInterval(spray)
    spray = undefined
  })
})
if (!module.parent) {
  server.listen(port, () => {
    console.log(`donut-monster listening on ${server.address().port}`)
  })
}

module.exports = io
