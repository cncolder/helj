'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:middlewares:passport');

_koaPassport2.default.use(_user2.default.createStrategy());
_koaPassport2.default.serializeUser(_user2.default.serializeUser());
_koaPassport2.default.deserializeUser(_user2.default.deserializeUser());

var initialize = _koaPassport2.default.initialize();
var session = _koaPassport2.default.session();

var client = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Mark socket with user
            ctx.sock.socket.user = ctx.req.user;

            if (!ctx.client) ctx.client = function (id) {
              // All sockets in connected hash
              var connected = ctx.io.socket.sockets.connected || {};
              var socket = (0, _keys2.default)(connected).map(function (key) {
                return connected[key];
              }).find(function (socket) {
                // Find socket by id or username
                return socket.user && (socket.user.id == id || socket.user.username == id) && socket;
              }) || {
                // Dummy socket for offline user
                emit: function emit() {}
              };
            };

            return _context.abrupt('return', next());

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;
  return function client(_x, _x2) {
    return ref.apply(_this, arguments);
  };
}();

var login = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(ctx.url == '/auth/login')) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', _koaPassport2.default.authenticate('local', function (user, info, status) {
              if (user) {
                ctx.user = user;
                ctx.session = ctx.session || {};
                ctx.session.passport = {
                  user: user.username
                };

                ctx.body = user;
                ctx.status = 200;
              } else {
                ctx.body = info;
                ctx.status = 401;
              }
            })(ctx, next));

          case 4:
            return _context2.abrupt('return', next());

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;
  return function login(_x3, _x4) {
    return ref.apply(_this, arguments);
  };
}();

var logout = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(ctx.url == '/auth/logout')) {
              _context3.next = 6;
              break;
            }

            ctx.logout();
            delete ctx.session.passport;
            ctx.status = 204;
            _context3.next = 7;
            break;

          case 6:
            return _context3.abrupt('return', next());

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })),
      _this = undefined;
  return function logout(_x5, _x6) {
    return ref.apply(_this, arguments);
  };
}();

var io = exports.io = (0, _koaCompose2.default)([initialize, session, client, login, logout]);

exports.default = (0, _koaCompose2.default)([initialize, session]);