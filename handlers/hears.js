const axios = require('axios')
const urlHelper = require('../helpers/url')
const passageHelper = require('../helpers/passage')
const debug = require('debug')('bot:handler')
const { API } = process.env

module.exports = () => async (ctx) => {
  ctx.tg.sendChatAction(ctx.from.id, 'typing')
  const text = ctx.message.text.trim()
  const url = urlHelper('scan')
  await axios
    .get(url, {
      params: {
        text,
        key: API
      }
    })
    .then(async res => {
      if (res.data.results[0]) {
        debug('data %O', res.data.results)
        const passage = await passageHelper(res.data.results[0].passage)
        ctx.replyWithMarkdown(
          `*Verse: ${res.data.results[0].passage}*\n${passage}`
        )
      } else {
        ctx.reply('No bible verse detected from your message.')
      }
    })
    .catch(err => debug('error %O', err))
}
