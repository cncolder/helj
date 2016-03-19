'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useragent = require('useragent');

var _useragent2 = _interopRequireDefault(_useragent);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _toJson = require('./plugins/to-json');

var _toJson2 = _interopRequireDefault(_toJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:browser-error');

var schema = new _mongoose2.default.Schema({
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
    type: _mongoose2.default.Schema.Types.Mixed,
    set: function set(value) {
      return _useragent2.default.parse(value).toJSON();
    }
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
});

schema.plugin(_toJson2.default);

exports.default = _mongoose2.default.model('BrowserError', schema);
