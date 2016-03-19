'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _config2.default.compress;

exports.default = (0, _koaCompress2.default)(opts);