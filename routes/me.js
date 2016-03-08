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

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _expect = require('../lib/expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:routes:me');

var router = new _koaRouter2.default({
  prefix: '/me'
}).use(_role2.default.can('access home page')).put('/email', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var email;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = ctx.req.body;

            (0, _expect2.default)(email).param('email').to.not.be.empty;
            _context.next = 4;
            return ctx.req.user.update({
              email: email
            });

          case 4:
            ctx.status = 200;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;
  return function (_x, _x2) {
    return ref.apply(_this, arguments);
  };
}()).put('/phone', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var phone;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            phone = ctx.req.body;

            (0, _expect2.default)(phone).param('phone').to.not.be.empty;
            _context2.next = 4;
            return ctx.req.user.update({
              phone: phone
            });

          case 4:
            ctx.status = 200;

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;
  return function (_x3, _x4) {
    return ref.apply(_this, arguments);
  };
}());

exports.default = router.routes();