const { Extra } = require('telegraf')
const packageJson = require('../../package.json')

const name = process.env.BOT_NAME
const description = packageJson.description
const version = packageJson.version

module.exports = () => ctx => {
  const text =
    `*${name}* (_${version}_)\n` +
    `_${description}_\n\n` +
    'Use /help to see the available commands\n\n' +
    '⨳ Bot by `KʀɪᴠAʀᴛ`'
  ctx.reply(text, Extra.markdown())
}
