'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const { get, post } = require('koa-route')
const uuidv4 = require('uuid/v4')
const zipObject = require('lodash.zipobject')

const app = new Koa()
const donuts = new Map()
const port = 3000

app.use(bodyParser())

if (process.env.NODE_ENV !== 'test') app.use(logger())


app.use(get('/', (ctx) => {
  ctx.body = '👹 🍩  nom nom nom DONUTS!!!\n'
}))
app.use(get('/donuts', (ctx) => {
  ctx.body = zipObject(Array.from(donuts.entries()))
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
  donuts.set(uuidv4(), ctx.request.body)

  ctx.body = {
    [id]: ctx.request.body
  }
}))

if (!module.parent) {
  app.listen(port)
  console.log(`donut-monster listening on ${port}`)
}

module.exports = app
