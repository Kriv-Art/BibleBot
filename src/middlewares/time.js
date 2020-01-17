const debug = require('debug')('bot:middleware')

module.exports = () => (_ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    debug('Response time %sms', ms)
  })
}
