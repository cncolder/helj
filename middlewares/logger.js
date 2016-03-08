'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _config2.default.logger;

exports.default = (0, _koaLogger2.default)(opts);