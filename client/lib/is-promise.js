'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Check if target is a promise
 * https://github.com/acdlite/redux-promise/blob/master/src/index.js
 */

exports.default = function (val) {
  return val && 'function' == typeof val.then;
};