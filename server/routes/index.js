'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _wechatOauth = require('../lib/wechat-oauth');

var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _shop = require('./shop');

var _shop2 = _interopRequireDefault(_shop);

var _me = require('./me');

var _me2 = _interopRequireDefault(_me);

var _browserError = require('./browser-error');

var _browserError2 = _interopRequireDefault(_browserError);

var _wechat = require('./wechat');

var _wechat2 = _interopRequireDefault(_wechat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Routers
 *
 * Import all routers at here.
 */

var log = require('../lib/debug')('app:routes');

var router = new _koaRouter2.default().use(_role2.default.can('access public page')).get('/', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    var redirectUrl, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Use this for send a init session to client. Socket.io use koa session id as identity. It allow passport auth in the future.
            ctx.session.io = '';

            if (!(ctx.isWechat && !ctx.req.user)) {
              _context.next = 5;
              break;
            }

            redirectUrl = _config2.default.rootUrl + '/wechat/authed';
            url = ctx.isWechat ? _wechatOauth2.default.getAuthorizeURL(redirectUrl, ctx.url, 'snsapi_base') : _wechatOauth2.default.getAuthorizeURLForWebsite(redirectUrl);
            return _context.abrupt('return', ctx.redirect(url));

          case 5:

            ctx.render('index', {
              env: {
                NODE_ENV: process.env.NODE_ENV
              }
            });
            ctx.status = 200;

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;
  return function (_x) {
    return ref.apply(_this, arguments);
  };
}());

var index = router.routes();

var io = exports.io = (0, _koaCompose2.default)([_auth2.default, _shop2.default, _me2.default]);

exports.default = (0, _koaCompose2.default)([index, _shop2.default, _wechat2.default, _browserError2.default]);