/**
 * Wechat OAuth Token
 */

import mongoose from './mongoose'
const log = require('../lib/debug')('app:models:wechat-oauth-token')


const schema = new mongoose.Schema({
  openid: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
})


export default mongoose.model('WechatOAuthToken', schema)
