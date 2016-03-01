/**
 * User
 *
 * User account for this system.
 */

import expect from '../lib/expect'
import * as regex from '../lib/regex'
import mongoose from './mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import toJSON from './plugins/to-json'
const log = require('debug')('app:models:user')


const Schema = mongoose.Schema
const sexEnum = ['unknown', 'male', 'female']
const schema = new Schema({
  username: String,
  wechat: {
    subscribe: Boolean,
    openid: {
      type: String,
      unique: true,
    },
    nickname: String,
    sex: {
      type: String,
      enum: sexEnum,
      set: v => (/^\d$/.test(v)) ? sexEnum[parseInt(v, 10)] : v,
    },
    language: String,
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    subscribeAt: Date,
    unionid: String,
    remark: String,
    groupid: Number,
    token: Schema.Types.Mixed,
  },
})

schema.virtual('wechat.subscribe_time')
  .get(function() {
    return (this.wechat.subscribeAt.getTime() / 1000).toFixed()
  })
  .set(function(v) {
    this.wechat.subscribeAt = new Date(v * 1000)
  })


export default mongoose.model('User', schema)
