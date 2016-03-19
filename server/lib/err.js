'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Err = function (_Error) {
  (0, _inherits3.default)(Err, _Error);

  function Err() {
    (0, _classCallCheck3.default)(this, Err);

    var name = undefined,
        message = undefined,
        extra = undefined;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var arg = _step.value;

        if ('string' == typeof arg) {
          if (/Error$/.test(arg) && !/\s/.test(arg)) {
            name = arg;
          } else {
            message = arg;
          }
        } else if ('object' == (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg))) {
          extra = arg;
        }
      }

      // Avoids settings null message
      // https://github.com/hapijs/boom/blob/master/lib/index.js#L88
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Err).call(this, message || undefined));

    if (Error.captureStackTrace) Error.captureStackTrace(_this, Err);

    if (name) _this.name = name;
    if (extra) (0, _assign2.default)(_this, extra);
    return _this;
  }

  return Err;
}(Error); /**
           * Err
           *
           * Error utils class
           */


exports.default = Err;