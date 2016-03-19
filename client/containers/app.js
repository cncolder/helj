'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = exports.App = undefined;

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

var _shop = require('../actions/shop');

var _cart = require('../actions/cart');

var _reactWeui = require('react-weui');

var _easeIn = require('../components/ease-in');

var _easeIn2 = _interopRequireDefault(_easeIn);

var _cart2 = require('../components/cart');

var _cart3 = _interopRequireDefault(_cart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * App
 *
 * Main application.
 */

var log = require('debug')('client:containers:app');

var App = exports.App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));

    _this.onCartHeightChange = function (e) {
      if (e != _this.state.cartHeight) _this.setStateDefer({
        cartHeight: e
      });
    };

    _this.onPay = function (e) {
      e.preventDefault();
    };

    _this.renderTag = function (tag, index) {
      var products = _this.props.products.filter(function (_ref) {
        var tags = _ref.sample.tags;
        return tags.includes(tag);
      });
      return _lib.React.createElement(
        'div',
        { key: index },
        _lib.React.createElement(
          _reactWeui.CellsTitle,
          { className: 'tag-name' },
          tag
        ),
        _lib.React.createElement(
          _reactWeui.Cells,
          { className: 'products' },
          products.map(_this.renderProduct)
        )
      );
    };

    _this.renderProduct = function (product, index) {
      var cartItem = _this.props.cartItems.find(function (item) {
        return item.id == product.id;
      });
      var minusButton = cartItem ? _lib.React.createElement('i', { className: 'icon-minus-circle', onClick: function onClick() {
          return _this.props.removeFromCart(product);
        } }) : _lib.React.createElement('span', null);
      return _lib.React.createElement(
        _reactWeui.Cell,
        { className: 'product', key: index },
        _lib.React.createElement(
          _reactWeui.CellBody,
          { className: 'weui_cell_bd weui_cell_primary image' },
          _lib.React.createElement('img', { className: 'cover',
            src: product.sample.cover,
            alt: product.sample.name })
        ),
        _lib.React.createElement(
          _reactWeui.CellBody,
          { className: 'weui_cell_bd weui_cell_primary container' },
          _lib.React.createElement(
            'div',
            { className: 'content' },
            _lib.React.createElement(
              'span',
              { className: 'sn' },
              index + 1
            ),
            _lib.React.createElement(
              'h4',
              { className: 'name' },
              product.sample.name
            ),
            _lib.React.createElement(
              'p',
              { className: 'desc' },
              product.sample.desc
            ),
            _lib.React.createElement(
              'div',
              { className: 'price' },
              product.sample.price,
              _lib.React.createElement(
                'span',
                { className: 'rmb' },
                'rmb'
              )
            ),
            _lib.React.createElement(
              'div',
              { className: 'action' },
              minusButton,
              _lib.React.createElement(
                'span',
                { className: 'amount' },
                cartItem ? cartItem.amount : ''
              ),
              _lib.React.createElement('i', { className: 'icon-plus-circle', onClick: function onClick() {
                  return _this.props.addToCart(product);
                } })
            )
          )
        ),
        _lib.React.createElement(_reactWeui.CellFooter, null)
      );
    };

    _this.renderCart = function (cart) {
      return _lib.React.createElement(_cart3.default, { cart: cart, items: cart.products || [],
        onHeightChange: _this.onCartHeightChange,
        onRemove: _this.props.removeFromCart,
        onPay: _this.onPay });
    };

    _this.state = {};
    _this.props.getShop();
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var shop = _props.shop;
      var cart = _props.cart;

      if (shop.name && document.title != shop.name) document.title = shop.name;
      return _lib.React.createElement(
        _easeIn2.default,
        { className: 'app', style: { paddingBottom: this.state.cartHeight || 0 } },
        ['和隆记力荐', '和隆记能量饭'].map(this.renderTag),
        this.renderCart(cart)
      );
    }
  }]);
  return App;
}(_lib.Component);

App.propTypes = {
  shop: _lib.PropTypes.object.isRequired,
  products: _lib.PropTypes.array.isRequired,
  cart: _lib.PropTypes.object.isRequired,
  cartItems: _lib.PropTypes.array.isRequired,
  getShop: _lib.PropTypes.func.isRequired,
  addToCart: _lib.PropTypes.func.isRequired,
  removeFromCart: _lib.PropTypes.func.isRequired
};
App.defaultProps = {
  shop: {},
  products: [],
  cart: {},
  cartItems: []
};
var selector = exports.selector = (0, _lib.createSelector)(function (state) {
  return state.me;
}, function (state) {
  return state.shop;
}, function (state) {
  return state.cart;
}, function () {
  var me = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var shop = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var cart = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  return {
    me: me,
    shop: shop,
    products: shop.products || [],
    cart: cart,
    cartItems: cart.products || []
  };
});

exports.default = (0, _lib.connect)(selector, {
  getShop: _shop.getShop, addToCart: _cart.addToCart, removeFromCart: _cart.removeFromCart
})(App);