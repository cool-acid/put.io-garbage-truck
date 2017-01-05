const putIO = require('put.io-v2')
const config = require('./config')

const API = new putIO(config.oauthToken)

API.files.list(0, (data) => {
  data.files.forEach( (file) => {
    const isTagged = file.name.search(/{.+}/) > -1
    if (!isTagged) {
      if (config.ignore.indexOf(file.name) === -1) {
        API.files.rename(file.id, '{T} ' + file.name)
      }
    }
  })
})