if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const Composer = require('telegraf/composer')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const hearsHandler = require('./handlers/hears')
const rateLimit = require('telegraf-ratelimit')
const { rate } = require('./config')
const {
  helpCommand,
  settingsCommand,
  aboutCommand,
  startCommand,
  bibleCommand
} = require('./commands')
const {
  timeMiddleware,
  userMiddleware
} = require('./middlewares')
const {
  NODE_ENV,
  BOT_API,
  PORT,
  URL
} = process.env

let bot
if (NODE_ENV === 'development') {
  bot = new Composer()
} else {
  bot = new Telegraf(BOT_API)
}

/**
 * Middlewares
 */
bot.use(session())
bot.use(timeMiddleware())
bot.use(userMiddleware())
bot.use(rateLimit(rate))

/**
 * Commands
 */
bot.start(startCommand())
bot.help(helpCommand())
bot.settings(settingsCommand())
bot.command('date', ({ reply }) => reply(`Server time: ${Date()}`))
bot.command('about', aboutCommand())
bot.command('bible', bibleCommand())

/**
 * Handlers
 */
bot.on('text', hearsHandler())

if (NODE_ENV !== 'development') {
  bot.launch({
    webhook: {
      domain: URL,
      port: PORT
    }
  })
}

module.exports = bot
