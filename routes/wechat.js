'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _wechatOauth = require('../lib/wechat-oauth');

var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var _wechatApi = require('../lib/wechat-api');

var _wechatApi2 = _interopRequireDefault(_wechatApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:routes:wechat'); /**
                                                         * Wechat OAuth router and middleware
                                                         */

var router = new _koaRouter2.default({
  prefix: '/wechat'
}).get('/authed', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    var code, result, openid, userinfo, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.assert(ctx.isWechat, 403, 'wechat only');
            code = ctx.query.code;
            _context.next = 4;
            return _wechatOauth2.default.getAccessTokenAsync(code);

          case 4:
            result = _context.sent;
            openid = result.data.openid;
            _context.next = 8;
            return _wechatApi2.default.getUserAsync(openid);

          case 8:
            userinfo = _context.sent;
            _context.next = 11;
            return _user2.default.findOne({
              'wechat.openid': openid
            });

          case 11:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 14;
              break;
            }

            _context.t0 = new _user2.default();

          case 14:
            user = _context.t0;

            user.username = openid;
            user.role = 'wechat';
            user.wechat = (0, _extends3.default)({}, user.wechat, userinfo);
            _context.next = 20;
            return user.save();

          case 20:

            ctx.session.passport = {
              type: 'wechat',
              user: user.username
            };

            _context.next = 23;
            return ctx.redirect(ctx.query.state);

          case 23:
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

var routes = router.routes();

routes.checkToken = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var redirectUrl, url;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!ctx.session.wechat || !ctx.session.wechat.code)) {
              _context2.next = 6;
              break;
            }

            redirectUrl = _config2.default.rootUrl + '/wechat/authed/';
            url = ctx.iswx ? _wechatOauth2.default.getAuthorizeURL(redirectUrl, ctx.url, 'snsapi_base') : _wechatOauth2.default.getAuthorizeURLForWebsite(redirectUrl);
            return _context2.abrupt('return', ctx.redirect(url));

          case 6:
            _context2.next = 8;
            return next();

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;
  return function (_x2, _x3) {
    return ref.apply(_this, arguments);
  };
}();

exports.default = routes;