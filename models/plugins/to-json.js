'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (schema) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options = (0, _assign2.default)({
    hide: '',
    map: {
      _id: 'id'
    }
  }, options);
  options.hide += ' __v';

  var hide = options.hide.split(' ');
  var map = options.map;

  if (!schema.options.toJSON) schema.options.toJSON = {};
  schema.options.toJSON.transform = function (doc, ret, options) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(hide), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        delete ret[key];
      }
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

    for (var key in map) {
      ret[map[key]] = ret[key];
      delete ret[key];
    }
  };
};