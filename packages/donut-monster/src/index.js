'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const { all, delete: del, get, post } = require('koa-route')
const WebSocket = require('ws')
const websockify = require('koa-websocket')
const uuidv4 = require('uuid/v4')

const { NEW_DONUT, SUBMIT_OFF, SUBMIT_ON } = require('./messages.js')

const app = websockify(new Koa())
const donuts = new Map()
let isSubmit = false
const port = process.env.PORT || 666

const broadcast = (type, data) => {
  app.ws.server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, data }))
    }
  })
}

app.use(bodyParser())

if (process.env.NODE_ENV !== 'test') app.use(logger())

app.use(get('/', (ctx) => {
  ctx.body = '👹 🍩  nom nom nom DONUTS!!!\n'
}))
app.use(get('/donuts', (ctx) => {
  ctx.body = Array.from(donuts.entries()).reduce((memo, [id, donut]) => {
    memo[id] = donut
    return memo
  }, {})
}))
app.use(get('/donuts/:id', (ctx, id) => {
  if (!donuts.has(id)) {
    return ctx.throw(404, `${id} not found`)
  }
  ctx.body = {
    [id]: donuts.get(id)
  }
}))
app.use(post('/donuts', (ctx) => {
  const id = uuidv4()
  // TODO: validate
  const donut = ctx.request.body

  donuts.set(uuidv4(), donut)

  broadcast(NEW_DONUT, donut)

  ctx.status = 201
  ctx.body = {
    [id]: donut
  }
}))

app.use(get('/is-submit-mode', (ctx) => {
  ctx.body = isSubmit
}))
app.use(post('/is-submit-mode', (ctx) => {
  isSubmit = true
  broadcast(SUBMIT_ON)
  ctx.body = isSubmit
}))

app.use(del('/is-submit-mode', (ctx) => {
  isSubmit = false
  broadcast(SUBMIT_OFF)
  ctx.body = isSubmit
}))

app.ws.use(all('/voodoo', (ctx) => {
  ctx.websocket.send('👋 🍩')
}))

if (!module.parent) {
  app.listen(port)
  console.log(`donut-monster listening on ${port}`)
}

module.exports = app
