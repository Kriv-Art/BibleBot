const { Markup } = require('telegraf')
const searchHelper = require('../helpers/search')
const debug = require('debug')('bot:middleware')

module.exports = () => async (ctx) => {
  const text = ctx.inlineQuery.query.trim()
  if (text === '') {
    return ctx.answerInlineQuery([
      {
        type: 'article',
        id: 1,
        title: 'Enter text to search in the bible.',
        input_message_content: {
          message_text: 'Switch to inline to search a bible verse. 😉'
        },
        reply_markup: Markup.inlineKeyboard([
          Markup.switchToCurrentChatButton('Switch inline', 'bibilia_bot')
        ])
      }
    ])
  }
  const { results } = await searchHelper(text)
  debug('Results %O', results)
  if (results && results[0]) {
    const verses = results
      .map(({ title, preview }, i) => ({
        type: 'article',
        id: i,
        title: title,
        description: preview,
        input_message_content: {
          message_text: `*Verse: ${title}*\n${preview}`,
          parse_mode: 'markdown'
        },
        reply_markup: Markup.inlineKeyboard([
          Markup.urlButton('Bible Bot', 'https://t.me/bibilia_bot'),
          Markup.switchToChatButton('Search', 'bibilia_bot')
        ])
      }))
    return ctx.answerInlineQuery(verses)
  }
}
