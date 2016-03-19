'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _lib = require('../lib');

var _me = require('../actions/me');

var meActions = _interopRequireWildcard(_me);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('client:containers:layout');

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout(props) {
    (0, _classCallCheck3.default)(this, Layout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Layout).call(this, props));

    _this.props.getWhoami();
    return _this;
  }

  (0, _createClass3.default)(Layout, [{
    key: 'render',
    value: function render() {
      return _lib.React.createElement(
        'div',
        { className: 'layout' },
        this.props.children
      );
    }
  }]);
  return Layout;
}(_lib.Component);

Layout.propTypes = {
  getWhoami: _lib.PropTypes.func.isRequired
};
var selector = exports.selector = (0, _lib.createSelector)(function (state) {
  return state.me;
}, function () {
  var me = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return {
    role: me.role
  };
});

exports.default = (0, _lib.connect)(selector, (0, _extends3.default)({}, meActions))(Layout);