'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _wechatApi = require('wechat-api');

var _wechatApi2 = _interopRequireDefault(_wechatApi);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _configure = require('../models/configure');

var _configure2 = _interopRequireDefault(_configure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wechat api
 */

var opts = _config2.default.wechat;
var key = 'wechat-api-token';
var wechatApi = new _wechatApi2.default(opts.appid, opts.secret, function (callback) {
  _configure2.default.findOne({
    key: key
  }, function (err, cfg) {
    if (err || !cfg) {
      callback(err);
    } else {
      callback(null, cfg.value);
    }
  });
}, function (token, callback) {
  _configure2.default.findOne({
    key: key
  }, function (err, cfg) {
    if (err || !cfg) {
      cfg = new _configure2.default({
        key: 'wechat-api-token',
        value: token
      });
    } else {
      cfg.value = token;
    }
    cfg.save(callback);
  });
});
var promisedWechatApi = _bluebird2.default.promisifyAll(wechatApi);

exports.default = promisedWechatApi;