/**
 * Sample donut creator.
 *
 * Push up sample donuts to the donut monster. Useful for previewing UIs.
 */

const io = require('socket.io-client')
const { getRandomDonuts, messages } = require('donut-common')

const socket = io('http://localhost:3001')
const uploadDonuts = () => {
  const randos = []
  const count = Math.ceil(Math.random() * 20)

  // This could take a while...
  while (randos.length < count) {
    const donut = getRandomDonuts(1)[0]

    if (donut.DONUT_RATING >= 0.7) {
      randos.push(donut)
    }
  }

  console.log(`Uploading ${randos.length} random donuts`)
  socket.emit(messages.UPLOAD_DONUTS, randos)
}

socket.on('connect', () => {
  console.log('Connected')
})
socket.on('disconnect', (reason) => {
  console.log(`Disconnected: ${reason}`)
})
socket.on('error', error => {
  throw error
})

socket.on(messages.INIT_CLIENT, ({ submitMode }) => {
  const start = () => {
    uploadDonuts()
    setInterval(uploadDonuts, 5000)
  }

  if (!submitMode) {
    socket.once(messages.SUBMIT_MODE, start)
    socket.emit(messages.SUBMIT_MODE, true)
  } else {
    start()
  }
})
