'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');

var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);

var _webpackCompiler = require('./webpack-compiler');

var _webpackCompiler2 = _interopRequireDefault(_webpackCompiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _koaWebpackHotMiddleware2.default)(_webpackCompiler2.default);