'use strict'

const getBookshelf = require('bookshelf')
const boom = require('boom')
const joi = require('joi')
const getKnex = require('knex')

const bookshelf = getBookshelf(getKnex({
  client: 'pg',
  connection: {
    charset: 'utf8',
    database: 'postgres',
    host: '127.0.0.1',
    password: 'mysecretpassword',
    user: 'postgres'
  }
}))

const donut = joi.object().keys({
  frosting_coverage: joi.number().min(0).max(1).required(),
  frosting_thickness: joi.number().min(0).max(1).required(),
  inner_radius: joi.number().min(0).max(1).required(),
  name: joi.string().min(3).max(255).required(),
  outer_radius: joi.number().min(0).max(1).required(),
  sprinkle_coverage: joi.number().min(0).max(1).required()
})
const donutId = joi.number().integer().positive()

const Donut = bookshelf.Model.extend({
  tableName: 'donuts'
})

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
      return Donut.fetchAll()
        .then(collection => reply(collection.toJSON()))
        .catch(error => reply(boom.wrap(error)))
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
    handler ({ payload }, reply) {
      return Donut.forge(payload).save()
        .then(donut => reply(donut.toJSON()))
        .catch(error => reply(boom.wrap(error)))
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
    handler (
      {
        params: { id },
        payload
      },
      reply
    ) {
      return Donut.forge({ id })
        .fetch()
        .then((donut) => {
          if (!donut) {
            throw boom.notFound(`Couldn't find donut ${id}`)
          }

          return donut.set(payload).save()
        })
        .then(donut => reply(donut.toJSON()))
        .catch(error => reply(boom.wrap(error)))
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
    handler ({ params: { id } }, reply) {
      return Donut.forge({ id })
        .fetch()
        .then((donut) => {
          if (!donut) {
            throw boom.notFound(`Couldn't find donut ${id}`)
          }

          return Promise.all([
            donut.toJSON(),
            donut.destroy()
          ])
        })
        .then(([json]) => reply(json))
        .catch(error => reply(boom.wrap(error)))
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
