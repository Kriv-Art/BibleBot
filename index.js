if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const Telegraf = require('telegraf')
const { session } = Telegraf
const debug = require('debug')('bot')
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
  adminMiddleware,
  timeMiddleware,
  userMiddleware,
  searchMiddleware
} = require('./middlewares')
const {
  BOT_API,
  PORT,
  URL
} = process.env

const bot = new Telegraf(BOT_API)

/**
 * Middlewares
 */
bot.use(session())
bot.use(adminMiddleware())
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
bot.on('inline_query', searchMiddleware())

debug('Booting bot.')
bot.launch({
  webhook: {
    domain: URL,
    port: PORT
  }
})
