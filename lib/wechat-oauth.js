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
    }, (err, user) => {
      if (err) {
        callback(err)
      } else if (!user) {
        callback(new Err('UserNotFoundError', `Cannot find user by openid: ${openid}`))
      } else {
        callback(null, user.wechat.token)
      }
    })
  },

  (openid, token, callback) => {
    User.findOne({
      'wechat.openid': openid,
    }, (err, user) => {
      if (err || !user) {
        user = new User({
          wechat: {
            openid, token,
          }
        })
      } else {
        user.wechat.token = token
      }
      user.save(callback)
    })
  }
)
const promisedWechatOAuth = bluebird.promisifyAll(wechatOAuth)


export default promisedWechatOAuth
