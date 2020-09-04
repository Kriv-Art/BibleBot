const timeMiddleware = require('./time')
const userMiddleware = require('./user')
const adminMiddleware = require('./admin')
const commandMiddleware = require('./command')
const searchMiddleware = require('./search')

module.exports = {
  timeMiddleware,
  userMiddleware,
  adminMiddleware,
  commandMiddleware,
  searchMiddleware
}
