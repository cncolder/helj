'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:wechat-oauth-token'); /**
                                                                     * Wechat OAuth Token
                                                                     */

var schema = new _mongoose2.default.Schema({
  openid: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: _mongoose2.default.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('WechatOAuthToken', schema);