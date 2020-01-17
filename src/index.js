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
  startCommand
} = require('./commands')
const {
  timeMiddleware
} = require('./middlewares')
const {
  NODE_ENV,
  BOT_API,
  PORT
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
bot.use(rateLimit(rate))

/**
 * Commands
 */
bot.start(startCommand())
bot.help(helpCommand())
bot.settings(settingsCommand())
bot.command('date', ({ reply }) => reply(`Server time: ${Date()}`))
bot.command('about', aboutCommand())

/**
 * Handlers
 */
bot.on('text', hearsHandler())

if (NODE_ENV !== 'development') {
  bot.launch({
    webhook: {
      domain: 'https://krivart-bible.herokuapp.com',
      port: PORT
    }
  })
}

module.exports = bot
