'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putMyPhone = exports.putMyEmail = exports.getShop = exports.getLogoutUser = exports.postLoginUser = exports.getWhoami = undefined;

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('client:lib:api');

/**
 * Auth
 */

var getWhoami = exports.getWhoami = function getWhoami() {
  return _socket2.default.get('/auth/whoami');
};
var postLoginUser = exports.postLoginUser = function postLoginUser(user) {
  return _socket2.default.post('/auth/login', user);
};
var getLogoutUser = exports.getLogoutUser = function getLogoutUser(user) {
  return _socket2.default.get('/auth/logout');
};

/**
 * Shop
 */

var getShop = exports.getShop = function getShop() {
  return _socket2.default.get('/shop');
};

/**
 * Me
 */

var putMyEmail = exports.putMyEmail = function putMyEmail(email) {
  return _socket2.default.put('/me/email', email);
};
var putMyPhone = exports.putMyPhone = function putMyPhone(phone) {
  return _socket2.default.put('/me/phone', phone);
};