'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaConditionalGet = require('koa-conditional-get');

var _koaConditionalGet2 = _interopRequireDefault(_koaConditionalGet);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _config2.default.conditionalGet;

exports.default = (0, _koaConditionalGet2.default)(opts);