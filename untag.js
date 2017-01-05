const putIO = require('put.io-v2')
const config = require('./config')

const API = new putIO(config.oauthToken)

API.files.list(0, (data) => {
  data.files.forEach( (file) => {
    const isTaggedForDeletion = file.name.search('{T} ') === 0
    if (isTaggedForDeletion) {
      const newName = file.name.substr(3)
      API.files.rename(file.id, newName)
    }
  })
})