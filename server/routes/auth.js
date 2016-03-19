'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:routes:auth');

var router = new _koaRouter2.default({
  prefix: '/auth'
}).use(_role2.default.can('access public page')).get('/whoami', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (ctx.req.user) {
              ctx.body = ctx.req.user;
              ctx.status = 200;
            } else {
              ctx.status = 401;
            }

          case 1:
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
}()).get('/logout', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.session = {};
            ctx.body = 'logout';
            ctx.status = 200;

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;
  return function (_x2) {
    return ref.apply(_this, arguments);
  };
}());

exports.default = router.routes();