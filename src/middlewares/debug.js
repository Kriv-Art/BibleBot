const debug = require('debug')('bot:update')

module.exports = () => async (ctx, next) => {
  debug(ctx.update)
  next(ctx)
}
