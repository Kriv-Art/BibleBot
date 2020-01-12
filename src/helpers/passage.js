const urlHelper = require('./url')
const axios = require('axios')
const debug = require('debug')('bot:helper')
const { API } = process.env

module.exports = async (passage) => {
  const url = urlHelper('content')
  return axios
    .get(url, {
      params: {
        passage,
        key: API
      }
    })
    .then(res => {
      debug('data received %O', res.data)
      return res.data
    })
    .catch(err => debug('error %O', err))
}
