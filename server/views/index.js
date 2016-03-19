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

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(
          'div',
          { id: 'client' },
          _react2.default.createElement(
            'div',
            { className: 'weui_loading_toast' },
            _react2.default.createElement('div', { className: 'weui_mask_transparent' }),
            _react2.default.createElement(
              'div',
              { className: 'weui_toast' },
              _react2.default.createElement(
                'div',
                { className: 'weui_loading' },
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_0' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_1' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_2' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_3' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_4' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_5' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_6' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_7' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_8' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_9' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_10' }),
                _react2.default.createElement('div', { className: 'weui_loading_leaf weui_loading_leaf_11' })
              ),
              _react2.default.createElement(
                'p',
                { className: 'weui_toast_content' },
                '连接服务器...'
              )
            )
          )
        ),
        _react2.default.createElement('script', { src: '/js/vendor.js' }),
        _react2.default.createElement('script', { src: '/js/client.js' })
      );
    }
  }]);
  return _class;
}(_react2.default.Component);

exports.default = _class;