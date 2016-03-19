'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

var _socket = require('../lib/socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Subscribe Socket.IO messages
 */

var log = require('debug')('client:store:subscribe-socket.io');

exports.default = function (store) {
  var dispatch = function dispatch(type) {
    return function (data) {
      return store.dispatch((0, _reduxActions.createAction)(type)(data));
    };
  };

  _socket2.default.on('/auth/whoami', dispatch('GET_WHOAMI'));
};