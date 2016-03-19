'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _socket = require('koa-socket/lib/socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('./debug')('app:lib:koa-socket-request');

exports.default = function (app, io) {
  _socket2.default.prototype.on = function (event, handler) {
    var _this = this;

    this.socket.on(event, function (data, cb) {
      log('socket on ' + event);

      var request = _this.socket.conn.request;
      var req = (0, _assign2.default)(new _http2.default.IncomingMessage(), request);
      var res = {
        status: 404,
        // session middleware use these functions.
        setHeader: function setHeader() {},
        getHeader: function getHeader() {},
        removeHeader: function removeHeader() {}
      };

      if (event == 'request') {
        req.method = data.method || 'GET';
        req.url = data.url;
        req.query = _qs2.default.parse(_url2.default.parse(req.url).query);
        req.body = data.data || {};
      }

      var ctx = (0, _assign2.default)(app.createContext(req, res), {
        io: io,
        sock: _this,
        event: event,
        data: data,
        acknowledge: cb
      });

      if (!_this.middleware) {
        return handler(ctx, data);
      }

      _this.middleware(ctx).then(function () {
        log('io middleware complete with status %o', ctx.status);
        ctx.status = ctx.status || 404;
        handler(ctx, data);
      }).catch(function (err) {
        log('io middleware failure', err, err.stack.split('\n').slice(0, 2).join('\n'));
        ctx.body = err;
        ctx.status = ctx.status && ctx.status >= 400 ? ctx.status : 500;
        handler(ctx);
      });
    });
  };
};