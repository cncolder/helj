Object.assign(process.env, {
  NODE_ENV: 'test',
  DEBUG: 'app:*',
  MONGO_URL: 'mongodb://127.0.0.1:27017/test',
})

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaid from 'chaid'

chai.use(chaiAsPromised)
chai.use(chaid)

const expect = chai.expect

// `require` is under cover of NODE_ENV. But `import` no
const mongoose = require('../models/mongoose').default

mongoose.cleanup = () => {
  if (process.env.NODE_ENV != 'test') return Promise.reject('test only')

  let collections = mongoose.connection.collections
  return Promise.all(
    Object.keys(collections).map(key => collections[key].remove({}))
  )
}

Object.assign(global, {
  expect, mongoose,
})
