if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const Composer = require('telegraf/composer')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const hearsHandler = require('./handlers/hears')
const {
  NODE_ENV,
  BOT_API
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
  'Just send me a verse\n' +
  'e.g.\n' +
  '  `John 3:16` `Jn3:16`'
))
bot.help(({ reply }) => reply('Comming Soon'))
bot.settings(({ reply }) => reply('Comming Soon'))
bot.command('date', ({ reply }) => reply(`Server time: ${Date()}`))

bot.on('text', hearsHandler())

if (NODE_ENV !== 'development') {
  bot.launch({
    webhook: {
      domain: 'https://krivart-bible.herokuapp.com',
      port: 3000
    }
  })
}

module.exports = bot
