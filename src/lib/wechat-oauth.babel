/**
 * Wechat api
 */

import bluebird from 'bluebird'
import WechatOAuth from 'wechat-oauth'
import Err from '../lib/err'
import config from '../config'
import User from '../models/user'
const log = require('./debug')('app:lib:wechat-oauth')


const opts = config.wechat
const wechatOAuth = new WechatOAuth(
  opts.appid,
  opts.secret,

  (openid, callback) => {
    User.findOne({
        'wechat.openid': openid,
      })
      .then(user => {
        if (!user) {
          callback(new Err('UserNotFoundError', `Cannot find user by openid: ${openid}`))
        } else {
          callback(null, user.wechat.token)
        }
      })
      .catch(callback)
  },

  (openid, token, callback) => {
    User.findOne({
        'wechat.openid': openid,
      })
      .then(user => {
        return user || new User({
          username: openid,
          role: 'wechat',
          wechat: {
            openid, token,
          },
        })
      })
      .then(user => user.save(callback))
      .catch(callback)
  }
)
const promisedWechatOAuth = bluebird.promisifyAll(wechatOAuth)


export default promisedWechatOAuth
