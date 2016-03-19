'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaGenericSession = require('koa-generic-session');

var _koaGenericSession2 = _interopRequireDefault(_koaGenericSession);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:middlewares:session');

var opts = _config2.default.session;

exports.default = (0, _koaGenericSession2.default)(opts);