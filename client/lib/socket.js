'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _socket = require('socket.io-client/socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _err = require('../lib/err');

var _err2 = _interopRequireDefault(_err);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Socket.IO promise
 */

var log = require('debug')('client:lib:socket');

var socket = (0, _socket2.default)();

socket.request = function (method, url, data) {
  return new _promise2.default(function (resolve, reject) {
    socket.emit('request', {
      method: method, url: url, data: data
    }, function (err, res) {
      log('err: %o res: %o', err, res);
      var status = res.status;
      var data = res.data;

      if (err) {
        reject(err);
      } else if (status >= 400) {
        if (data) {
          reject(new _err2.default((0, _extends3.default)({}, data, {
            message: 'AssertionError' == data.name ? data.message.split(':')[0] : data.message
          })));
        } else {
          reject(new _err2.default({
            status: status
          }));
        }
      } else {
        resolve(data);
      }
    });
  });
};

socket.get = function (url) {
  return socket.request('GET', url);
};
socket.post = function (url, data) {
  return socket.request('POST', url, data);
};
socket.put = function (url, data) {
  return socket.request('PUT', url, data);
};
socket.del = function (url) {
  return socket.request('DELETE', url);
};

socket.on('connect', function () {
  return log('connect');
});
socket.on('error', function (e) {
  return log('error %o', e);
});
socket.on('disconnect', function () {
  return log('disconnect');
});
socket.on('reconnect', function (e) {
  return log('reconnect %d', e);
});
socket.on('reconnect_attempt', function () {
  return log('reconnect_attempt');
});
socket.on('reconnecting', function (e) {
  return log('reconnecting %d', e);
});
socket.on('reconnect_error', function (e) {
  return log('reconnect_error %o', e);
});
socket.on('reconnect_failed', function () {
  return log('reconnect_failed');
});

exports.default = socket;