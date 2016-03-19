'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _debug = require('../lib/debug');

var _debug2 = _interopRequireDefault(_debug);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _browserError = require('../models/browser-error');

var _browserError2 = _interopRequireDefault(_browserError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('app:routes:browser-error');

var router = new _koaRouter2.default({
  prefix: '/browser-error'
}).get('/', function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _browserError2.default.create({
              message: ctx.query.message,
              url: ctx.query.url,
              line: ctx.query.line,
              column: ctx.query.column,
              stack: ctx.query.stack,
              referer: ctx.header.referer,
              ua: ctx.header['user-agent'],
              lang: ctx.acceptsLanguages()[0],
              ip: ctx.ips.pop() || ctx.ip
            });

          case 3:
            ctx.status = 201;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            log(_context.t0);
            ctx.status = 400;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6]]);
  })),
      _this = undefined;
  return function (_x) {
    return ref.apply(_this, arguments);
  };
}());

exports.default = router.routes();