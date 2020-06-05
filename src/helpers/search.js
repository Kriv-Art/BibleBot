const urlHelper = require('./url')
const axios = require('axios')
const debug = require('debug')('bot:helper')
const { API } = process.env

module.exports = async (query) => {
  const url = urlHelper('search')
  return axios
    .get(url, {
      params: {
        query,
        mode: 'verse',
        start: 0,
        limit: 50,
        key: API
      }
    })
    .then(res => {
      debug('data received %O', res.data)
      return res.data
    })
    .catch(err => debug('error %O', err))
}
