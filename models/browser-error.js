import useragent from 'useragent'
import mongoose from './mongoose'
import toJSON from './plugins/to-json'
const log = require('debug')('app:models:browser-error')

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  line: {
    type: String,
    required: true
  },
  column: String,
  stack: String,
  referer: String,
  ua: {
    type: mongoose.Schema.Types.Mixed,
    set: value => useragent
      .parse(value)
      .toJSON()
  },
  lang: String,
  ip: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
}, {
  capped: {
    size: 25600,
    max: 10000,
    autoIndexId: true
  },
  safe: false,
  skipVersioning: {
    dontVersionMe: true
  },
  timestamps: false
})

schema.plugin(toJSON)

export default mongoose.model('BrowserError', schema)
