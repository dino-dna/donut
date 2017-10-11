'use strict'

const good = require('good')
const hapi = require('hapi')

const v1 = require('./v1/index.js')

const server = new hapi.Server(
  process.env.NODE_ENV !== 'test'
  ? {
    debug: {
      request: '*'
    }
  }
  : null
)

const logAndDie = (error) => {
  console.error(error)
  process.exit(1)
}

server.connection({
  host: 'localhost',
  port: 3000,
  routes: {
    cors: {
      credentials: true,
      origin: ['*']
    }
  }
})

server.register(
  {
    register: v1
  },
  {
    routes: {
      prefix: '/v1'
    }
  }
)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      return server.register({
        register: good,
        options: {
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                  log: '*',
                  response: '*'
                }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      })
    }
  })
  .catch(logAndDie)

if (require.main === module) {
  server.start()
    .then(() => console.log(`Server running at: ${server.info.uri}`))
    .catch(logAndDie)
}

module.exports = server
