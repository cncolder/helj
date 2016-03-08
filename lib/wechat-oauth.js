'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _wechatOauth = require('wechat-oauth');

var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var _err = require('../lib/err');

var _err2 = _interopRequireDefault(_err);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('./debug')('app:lib:wechat-oauth'); /**
                                                       * Wechat api
                                                       */

var opts = _config2.default.wechat;
var wechatOAuth = new _wechatOauth2.default(opts.appid, opts.secret, function (openid, callback) {
  _user2.default.findOne({
    'wechat.openid': openid
  }).then(function (user) {
    if (!user) {
      callback(new _err2.default('UserNotFoundError', 'Cannot find user by openid: ' + openid));
    } else {
      callback(null, user.wechat.token);
    }
  }).catch(callback);
}, function (openid, token, callback) {
  _user2.default.findOne({
    'wechat.openid': openid
  }).then(function (user) {
    return user || new _user2.default({
      username: openid,
      role: 'wechat',
      wechat: {
        openid: openid, token: token
      }
    });
  }).then(function (user) {
    return user.save(callback);
  }).catch(callback);
});
var promisedWechatOAuth = _bluebird2.default.promisifyAll(wechatOAuth);

exports.default = promisedWechatOAuth;