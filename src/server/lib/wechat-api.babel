/**
 * Wechat api
 */

import bluebird from 'bluebird'
import WechatAPI from 'wechat-api'
import config from '../config'
import Configure from '../models/configure'


const opts = config.wechat
const key = 'wechat-api-token'
const wechatApi = new WechatAPI(
  opts.appid,
  opts.secret,

  (callback) => {
    Configure.findOne({
      key,
    }, (err, cfg) => {
      if (err || !cfg) {
        callback(err)
      } else {
        callback(null, cfg.value)
      }
    })
  },

  (token, callback) => {
    Configure.findOne({
      key,
    }, (err, cfg) => {
      if (err || !cfg) {
        cfg = new Configure({
          key: 'wechat-api-token',
          value: token,
        })
      } else {
        cfg.value = token
      }
      cfg.save(callback)
    })
  },
)
const promisedWechatApi = bluebird.promisifyAll(wechatApi)


export default promisedWechatApi
