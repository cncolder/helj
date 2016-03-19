'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('app:components:ease-in');

var EaseIn = function (_ReactCSSTransitionGr) {
  (0, _inherits3.default)(EaseIn, _ReactCSSTransitionGr);

  function EaseIn() {
    (0, _classCallCheck3.default)(this, EaseIn);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EaseIn).apply(this, arguments));
  }

  return EaseIn;
}(_reactAddonsCssTransitionGroup2.default);

EaseIn.defaultProps = {
  transitionName: 'ease-in',
  transitionAppear: true,
  transitionEnter: true,
  transitionLeave: true,
  transitionAppearTimeout: 100,
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 200
};
exports.default = EaseIn;