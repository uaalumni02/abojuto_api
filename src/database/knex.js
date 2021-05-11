var environment = process.env.NODE_ENV || 'development'
var config = require('./index.js')[environment]

module.exports = require('knex')(config)