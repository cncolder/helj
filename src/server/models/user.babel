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
const log = require('../lib/debug')('app:models:user')


const Schema = mongoose.Schema
const sexEnum = ['unknown', 'male', 'female']
const schema = new Schema({
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
}, {
  timestamp: true,
})

schema.plugin(passportLocalMongoose, {
  // https://github.com/saintedlama/passport-local-mongoose#options
  keylen: 32,
  iterations: 8,
})

schema.plugin(toJSON, {
  hide: 'hash salt',
})

schema.virtual('wechat.subscribe_time')
  .get(function() {
    return ((this.wechat.subscribeAt || new Date()).getTime() / 1000).toFixed()
  })
  .set(function(v) {
    this.wechat.subscribeAt = new Date(v * 1000)
  })

schema.statics.findOneAndRegisterWechat = function(openid, wechat, callback) {
  const query = {
    'wechat.openid': openid,
  }
  const update = {
    username: openid,
    role: 'wechat',
    wechat,
  }
  const options = {
    new: true,
    upsert: true,
  }
  if (callback) {
    this.findOneAndUpdate(query, update, options, callback)
  } else {
    return this.findOneAndUpdate(query, update, options)
  }
}

schema.statics.signup = function(user, password) {
  user.username = user.username.replace(/\s/g, '')
  password = password.replace(/\s/g, '')
  expect(password).to.be.a('string')
  expect(password.length).to.be.at.least(3)
  return new Promise((resolve, reject) => {
    this.register(user, password, (err, user) => {
      if (err) return reject(err)
      resolve(user)
    })
  })
}

schema.statics.auth = function(username, password) {
  return this.findByUsername(username)
    .then(user => {
      expect(user).to.be.exist
      return user.auth(password)
    })
}

schema.methods.auth = function(password) {
  password = password.replace(/\s/g, '')
  return new Promise((resolve, reject) => {
    this.authenticate(password, (err, user, passwordErr) => {
      if (err || passwordErr) return reject(err || passwordErr)
      resolve(user)
    })
  })
}

schema.methods.modifyPassword = function(old, password) {
  password = password.replace(/\s/g, '')
  expect(password).to.be.a('string', 'invalid password')
  expect(password.length).to.be.at.least(3, 'password too short')
  return this.auth(old)
    .then(user => {
      return new Promise((resolve, reject) => {
        this.setPassword(password, (err, user, passwordErr) => {
          if (err || passwordErr) return reject(err || passwordErr)
          resolve(user)
        })
      })
    })
}


export default mongoose.model('User', schema)
