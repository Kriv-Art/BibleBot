const timeMiddleware = require('./time')
const userMiddleware = require('./user')
const adminMiddleware = require('./admin')
const commandMiddleware = require('./command')

module.exports = {
  timeMiddleware,
  userMiddleware,
  adminMiddleware,
  commandMiddleware
}
