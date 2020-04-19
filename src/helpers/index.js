const err = require('debug')('bot:error')
const configMap = require('../config')
const fs = require('fs')
const path = require('path')

const errorHandler = (error) => {
  err(error)
  return false
}

const getAdminCommands = () => {
  return fs.readdirSync(path.join(__dirname, '/../commands/admin/')).map(val => val.replace(/(\.\/|\.js)/g, ''))
}

const defaultConfig = Object.entries(configMap).reduce(
  (acc, [settings, object]) => {
    acc[settings] = Object.entries(object).reduce(
      (accField, [field, { default: value }]) => {
        accField[field] = value
        return accField
      },
      {}
    )
    return acc
  },
  {}
)

const makeUserMention = ({
  id,
  username,
  first_name: firstName,
  last_name: lastName
}) => username
  ? `@${username}`
  : `[${firstName || lastName}](tg://user?id=${id})`

const escapeMarkdown = (text) => {
  let txt
  const chars = ['_', '*', '`', '[']
  chars.forEach(chr => {
    txt = text.replace(chr, `\\${chr}`)
  })
  return txt
}

module.exports = {
  errorHandler,
  defaultConfig,
  makeUserMention,
  getAdminCommands,
  escapeMarkdown
}
