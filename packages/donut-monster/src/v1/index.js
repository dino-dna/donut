'use strict'

module.exports.register = (server, options, next) => {
  next()
}

module.exports.register.attributes = {
  name: 'api_version_1',
  version: '1.0.0'
}
