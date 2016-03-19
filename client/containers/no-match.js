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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _easeIn = require('../components/ease-in');

var _easeIn2 = _interopRequireDefault(_easeIn);

var _reactWeui = require('react-weui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('app:containers:no-match');

var NoMatch = function (_React$Component) {
  (0, _inherits3.default)(NoMatch, _React$Component);

  function NoMatch() {
    (0, _classCallCheck3.default)(this, NoMatch);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoMatch).apply(this, arguments));
  }

  (0, _createClass3.default)(NoMatch, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _easeIn2.default,
        { className: 'no-match' },
        _react2.default.createElement(
          _reactWeui.Article,
          null,
          _react2.default.createElement(
            'h1',
            null,
            '找不到页面'
          ),
          _react2.default.createElement(
            'section',
            null,
            _react2.default.createElement(
              'h2',
              null,
              '您所访问的页面不存在, 可能的原因:'
            ),
            _react2.default.createElement(
              'section',
              null,
              _react2.default.createElement(
                'ol',
                { style: { marginLeft: 20 } },
                _react2.default.createElement(
                  'li',
                  null,
                  '当前页面还未完成制作.'
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  '页面已被删除, 请更新您的收藏夹.'
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  '请不要尝试手动改变页面访问地址.'
                )
              )
            )
          )
        )
      );
    }
  }]);
  return NoMatch;
}(_react2.default.Component);

exports.default = NoMatch;