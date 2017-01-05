const putIO = require('put.io-v2')
const config = require('./config')

const API = new putIO(config.oauthToken)
const filesToDelete = []

API.files.list(0, (data) => {
  data.files.forEach( (file) => {
    const isTaggedForDeletion = file.name.search('{T} ') === 0
    if (isTaggedForDeletion) {
      filesToDelete.push(file.id)
    }
  })
  API.files.delete(filesToDelete)
})