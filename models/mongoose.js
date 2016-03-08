'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _env = require('../lib/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:mongoose');

_mongoose2.default.set('debug', _env2.default.dev);

_mongoose2.default.connect(process.env.MONGO_URL);

_mongoose2.default.connection.on('error', log);
_mongoose2.default.connection.on('open', function () {
  return log('connection open');
});
_mongoose2.default.connection.on('close', function () {
  return log('connection close');
});

exports.default = _mongoose2.default;