'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaResponseTime = require('koa-response-time');

var _koaResponseTime2 = _interopRequireDefault(_koaResponseTime);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _config2.default.responseTime;

exports.default = (0, _koaResponseTime2.default)(opts);