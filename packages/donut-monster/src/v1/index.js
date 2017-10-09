'use strict'

const joi = require('joi')

const donut = joi.object().keys({
  frostingCoverage: joi.number().min(0).max(1),
  frostingThickness: joi.number().min(0).max(1),
  innerRadius: joi.number().min(0).max(1),
  outerRadius: joi.number().min(0).max(1),
  sprinkleCoverage: joi.number().min(0).max(1)
})
const donutId = joi.string()

module.exports.register = (server, options, next) => {
  server.route({
    handler (request, reply) {
      return reply({
        message: 'Nom nom nom donuts 👹🍩'
      })
    },
    method: 'GET',
    path: '/'
  })

  server.route({
    config: {
      description: 'Get all donuts'
    },
    handler (request, reply) {
      return reply()
    },
    method: 'GET',
    path: '/donuts'
  })

  server.route({
    config: {
      description: 'Create a new donut',
      validate: {
        payload: donut
      }
    },
    handler (request, reply) {
      return reply()
    },
    method: 'POST',
    path: '/donuts'
  })

  server.route({
    config: {
      description: 'Edit a donut',
      validate: {
        payload: donut,
        params: {
          id: donutId
        }
      }
    },
    handler (request, reply) {
      return reply()
    },
    method: 'PUT',
    path: '/donuts/{id}'
  })

  server.route({
    config: {
      description: 'Delete a donut',
      validate: {
        params: {
          id: donutId
        }
      }
    },
    handler (request, reply) {
      return reply()
    },
    method: 'DELETE',
    path: '/donuts/{id}'
  })

  next()
}

module.exports.register.attributes = {
  name: 'api_version_1',
  version: '1.0.0'
}
