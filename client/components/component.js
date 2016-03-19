'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defer = require('lodash/defer');

var _defer2 = _interopRequireDefault(_defer);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_ReactComponent) {
  (0, _inherits3.default)(Component, _ReactComponent);

  function Component(props) {
    (0, _classCallCheck3.default)(this, Component);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Component).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Component, [{
    key: 'setStateDefer',
    value: function setStateDefer(nextState) {
      (0, _defer2.default)(this.setState.bind(this), nextState);
    }
  }]);
  return Component;
}(_react.Component);

exports.default = Component;