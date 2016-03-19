'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _env = require('../lib/env');

var _env2 = _interopRequireDefault(_env);

var _compress = require('./compress');

var _compress2 = _interopRequireDefault(_compress);

var _conditionalGet = require('./conditional-get');

var _conditionalGet2 = _interopRequireDefault(_conditionalGet);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _etag = require('./etag');

var _etag2 = _interopRequireDefault(_etag);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _passport = require('./passport');

var _passport2 = _interopRequireDefault(_passport);

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _responseTime = require('./response-time');

var _responseTime2 = _interopRequireDefault(_responseTime);

var _serveStatic = require('./serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _wechat = require('./wechat');

var _wechat2 = _interopRequireDefault(_wechat);

var _wechatDetector = require('./wechat-detector');

var _wechatDetector2 = _interopRequireDefault(_wechatDetector);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:middlewares:index');

var middlewaresForApp = [_responseTime2.default, _logger2.default, _compress2.default, _conditionalGet2.default, _etag2.default, _serveStatic2.default, _session2.default, _wechatDetector2.default, _passport2.default, _react2.default, _routes2.default, _wechat2.default];

if (_env2.default.local) {
  middlewaresForApp = [require('./webpack-dev').default, require('./webpack-hot').default].concat(middlewaresForApp);
}

var middlewaresForIO = [_session2.default, _passport.io, _routes.io];

var io = exports.io = _koaConvert2.default.compose(middlewaresForIO);

exports.default = _koaConvert2.default.compose(middlewaresForApp);