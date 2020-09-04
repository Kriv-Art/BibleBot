const { apiURL } = require('../config')

module.exports = (type, bible = 'KJV') => {
  switch (type) {
    case 'content':
    case 'contents':
      return `${apiURL}${type}/${bible}`
    case 'search':
      return `${apiURL}${type}/${bible}.js`
    case 'image':
      return `${apiURL}${type}/${bible}`
    default:
      return `${apiURL}${type}`
  }
}
