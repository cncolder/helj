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

var _shop = require('../models/shop');

var _shop2 = _interopRequireDefault(_shop);

var _expect = require('../lib/expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:routes:shop');

var router = new _koaRouter2.default({
  prefix: '/shop'
}).use(_role2.default.can('access public page')).get('/', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _shop2.default.findOne().populate({
              path: 'products',
              populate: {
                path: 'sample'
              }
            });

          case 2:
            ctx.body = _context.sent;

            ctx.status = 200;

          case 4:
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

exports.default = router.routes();