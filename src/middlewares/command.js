// const debug = require('debug')('bot:middleware')
const { getAdminCommands } = require('../helpers')

module.exports = () => (ctx, next) => {
  const adminCommands = getAdminCommands()
  if (ctx.updateType === 'message' && ctx.updateSubTypes[0] === 'text') {
    const text = ctx.update.message.text.toLowerCase()
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/)
      let args = []
      let command
      if (match !== null) {
        if (match[1]) {
          command = match[1]
          if (match[2]) {
            args = match[2].split(' ')
            if (command === 'start') {
              ctx.payload = args[0].trim()
            }
          }
          if (adminCommands.includes(command) && !ctx.admin) {
            return ctx.reply('Command unavailable')
          }
        }
      }

      ctx.command = {
        raw: text,
        name: command,
        args
      }
    }
  }
  return next()
}
