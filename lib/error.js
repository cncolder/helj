'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error.toJSON
 * https://github.com/AVVS/error-tojson/blob/master/index.js
 */

Object.defineProperty(Error.prototype, 'toJSON', {

  configurable: true,

  // These two lines for avoid raise error when subclass rewrite toJSON method.
  // e.g. MongoError
  // https://github.com/petkaantonov/bluebird/issues/291#issuecomment-74121263
  writable: true,
  enumerable: true,

  value: function value() {
    var _this = this;

    var obj = (0, _getOwnPropertyNames2.default)(this).reduce(function (alt, key) {
      return (0, _assign2.default)(alt, (0, _defineProperty3.default)({}, key, _this[key]));
    }, {});

    obj.name = this.name;
    obj.stack = obj.stk;
    return obj;
  }
});

/**
 * Error.stk
 */

Object.defineProperty(Error.prototype, 'stk', {
  get: function get() {
    return this.stack.split('\n').slice(0, 2).join('\n');
  }
});