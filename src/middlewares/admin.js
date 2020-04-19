const debug = require('debug')('bot:middleware')
const { admins } = require('../config')

module.exports = () => async (ctx, next) => {
  if (ctx.from) {
    ctx.admin = admins.includes(ctx.from.id)
    debug('User admin', ctx.admin)
  }
  return next()
}
