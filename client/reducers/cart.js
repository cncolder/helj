'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxActions.handleActions)({
  ADD_TO_CART: function ADD_TO_CART(state, action) {
    var nextState = (0, _extends3.default)({}, state);
    if (!nextState.products) nextState.products = [];

    var addedProduct = (0, _extends3.default)({}, action.payload);
    var existedProduct = nextState.products.find(function (product) {
      return product.id == addedProduct.id;
    });
    if (existedProduct) {
      existedProduct.amount += 1;
    } else {
      addedProduct.amount = 1;
      nextState.products.push(addedProduct);
    }

    return nextState;
  },

  REMOVE_FROM_CART: function REMOVE_FROM_CART(state, action) {
    var nextState = (0, _extends3.default)({}, state);
    if (!nextState.products) return state;

    var removedProduct = (0, _extends3.default)({}, action.payload);
    var existedProduct = nextState.products.find(function (product) {
      return product.id == removedProduct.id;
    });
    if (existedProduct) {
      if (existedProduct.amount > 1) {
        existedProduct.amount -= 1;
      } else {
        nextState.products = nextState.products.filter(function (product) {
          return product.id != existedProduct.id;
        });
      }
    } else {
      return state;
    }

    return nextState;
  }
}, {}); /**
         * Current phase reducer
         */