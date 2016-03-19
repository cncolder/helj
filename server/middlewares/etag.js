'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _config2.default.etag;

exports.default = (0, _koaEtag2.default)(opts);