'use strict'

const good = require('good')
const hapi = require('hapi')
const { promisify } = require('util')

const v1 = require('./v1/index.js')

const server = new hapi.Server({
  debug: {
    request: '*'
  }
})

const register = promisify(server.register.bind(server))

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

const init = () => register({
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
  .then(() => register(
    { register: v1 },
    {
      routes: {
        prefix: '/v1'
      }
    }
  ))
  .then(() => server.start())
  .then(() => console.log(`Server running at: ${server.info.uri}`))

if (require.main === module) {
  init().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

module.exports = init
