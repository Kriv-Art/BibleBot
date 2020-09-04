const debug = require('debug')('bot:database')
const db = require('../knexfile')
const knex = require('knex')(db[process.env.NODE_ENV])
const { errorHandler } = require('../helpers')

module.exports = () => async (ctx, next) => {
  if (ctx.from) {
    // Fix session undefined
    if (!ctx.session) {
      debug('session is undefined creating')
      ctx.session = new Map()
    }
    if (ctx.session.user) {
      debug('user already registered %o', ctx.session.user)
      return next()
    }

    const users = () => knex('users')
    const id = Number(ctx.from.id)
    const date = new Date()
    const user = await users().where({ id }).first().catch(errorHandler)

    if (user) {
      const diff = Object.keys(ctx.from).reduce((acc, key) => {
        if (key === 'id') {
          return acc
        }
        if (typeof ctx.from[key] === 'boolean') {
          user[key] = Boolean(user[key])
        }
        if (ctx.from[key] !== user[key]) {
          acc[key] = ctx.from[key]
        }
        return acc
      }, {})

      const fields = { ...diff, updated_at: date }

      if (Object.keys(diff).length > 0) {
        debug('updating user %o', fields)
        await users().where({ id }).update(fields).catch(errorHandler)
        ctx.session.user = await users().where({ id }).first().catch(errorHandler)
        return next()
      }

      ctx.session.user = user
      return next()
    }

    ctx.session.restricted = true
    ctx.session.user = { ...ctx.from, created_at: date, referer_id: ctx.payload }
    debug('inserting user to database')
    await users().insert(ctx.session.user).catch(errorHandler)
  }

  return next()
}
