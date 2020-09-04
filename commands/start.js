module.exports = () => ({ replyWithMarkdown }) => replyWithMarkdown(
  'I can send you bible verse\n' +
  'Just send me a verse or text with a verse\n' +
  'e.g.\n' +
  '  `John 3:16` or `Jn3:16`\n' +
  '   or\n' +
  '`Some messsage with a Mt4.4 verse in between text`'
)
