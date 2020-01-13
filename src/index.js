if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const Composer = require('telegraf/composer')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const hearsHandler = require('./handlers/hears')
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
bot.use(session())

bot.start(({ replyWithMarkdown }) => replyWithMarkdown(
  'I can send you bible verse\n' +
  'Just send me a verse or text with a verse\n' +
  'e.g.\n' +
  '  `John 3:16` or `Jn3:16`\n' +
  '   or\n' +
  '`Some messsage with a Mt4.4 verse in between text`'
))
bot.help(({ reply }) => reply(
  '🚧 Command under development'
))
bot.settings(({ reply }) => reply('🚧 Command under development'))
bot.command('date', ({ reply }) => reply(`Server time: ${Date()}`))

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
