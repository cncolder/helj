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

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _lib = require('../lib');

var _reactWeui = require('react-weui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('client:components:cart');

var Cart = function (_Component) {
  (0, _inherits3.default)(Cart, _Component);

  function Cart(props) {
    (0, _classCallCheck3.default)(this, Cart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Cart).call(this, props));

    _this.onCartInfoClick = function (e) {
      return _this.setState({
        open: !_this.state.open
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Cart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var items = this.props.items;

      if (!items || !items.length) {
        this.props.onHeightChange(0);
        return _lib.React.createElement('div', null);
      }

      var totalPrice = items.reduce(function (acc, item) {
        return acc + item.sample.price;
      }, 0);

      return _lib.React.createElement(
        'div',
        { className: 'cart', ref: function ref(div) {
            return div && _this2.props.onHeightChange(div.clientHeight);
          } },
        ' ',
        this.state.open && this.renderList(items),
        this.renderInfo(this.props.cart)
      );
    }
  }, {
    key: 'renderList',
    value: function renderList(items) {
      var _this3 = this;

      return _lib.React.createElement(
        _reactWeui.Cells,
        { className: 'cart-list' },
        items.map(function (item, i) {
          return _lib.React.createElement(
            _reactWeui.Cell,
            { className: 'cart-item', key: i },
            _lib.React.createElement(
              _reactWeui.CellBody,
              null,
              item.sample.name,
              ' * ',
              item.amount
            ),
            _lib.React.createElement(
              _reactWeui.CellFooter,
              null,
              _lib.React.createElement('i', { className: 'icon-minus-circle', onClick: function onClick() {
                  return _this3.props.onRemove(item);
                } })
            )
          );
        })
      );
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo(cart) {
      var totalAmount = (cart.products || []).reduce(function (acc, item) {
        return acc + item.amount;
      }, 0);
      var totalPrice = (cart.products || []).reduce(function (acc, item) {
        return acc + item.sample.price * item.amount;
      }, 0);
      return _lib.React.createElement(
        _reactWeui.Cells,
        { className: 'cart-info' },
        _lib.React.createElement(
          _reactWeui.Cell,
          { className: 'cart-bar' },
          _lib.React.createElement(
            _reactWeui.CellHeader,
            { onClick: this.onCartInfoClick },
            _lib.React.createElement('i', { className: 'icon-cart' })
          ),
          _lib.React.createElement(
            _reactWeui.CellBody,
            { onClick: this.onCartInfoClick },
            _lib.React.createElement(
              'span',
              { className: 'cart-total-amount' },
              totalAmount
            ),
            _lib.React.createElement(
              'span',
              { className: 'cart-total-price' },
              '¥',
              totalPrice
            )
          ),
          _lib.React.createElement(
            _reactWeui.CellBody,
            null,
            _lib.React.createElement(
              _reactWeui.Button,
              { className: 'cart-payment', type: 'primary', size: 'small', onClick: this.props.onPay },
              '结算'
            )
          )
        )
      );
    }
  }]);
  return Cart;
}(_lib.Component);

Cart.propTypes = {
  items: _lib.PropTypes.array,
  onHeightChange: _lib.PropTypes.func,
  onRemove: _lib.PropTypes.func.isRequired,
  onPay: _lib.PropTypes.func.isRequired
};
Cart.defaultProps = {
  items: [],
  onHeightChange: _noop2.default,
  onRemove: _noop2.default,
  onPay: _noop2.default
};
exports.default = Cart;