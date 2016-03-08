'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

var _koaWebpackDevMiddleware2 = _interopRequireDefault(_koaWebpackDevMiddleware);

var _webpackCompiler = require('./webpack-compiler');

var _webpackCompiler2 = _interopRequireDefault(_webpackCompiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _koaWebpackDevMiddleware2.default)(_webpackCompiler2.default, {
  // noInfo: true,
  // lazy: true,
  publicPath: _webpackCompiler.config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});