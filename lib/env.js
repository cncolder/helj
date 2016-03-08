'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV;

var env = (0, _extends3.default)({}, process.env, {
  env: NODE_ENV,
  dev: 'development' == NODE_ENV,
  test: 'test' == NODE_ENV,
  stage: 'staging' == NODE_ENV,
  prod: 'production' == NODE_ENV,
  deploy: ~['staging', 'production'].indexOf(NODE_ENV),
  version: process.env.VERSION
});

env.local = !env.deploy;

exports.default = env;