'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.addToCart = undefined;

var _reduxActions = require('redux-actions');

var _api = require('../lib/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addToCart = exports.addToCart = (0, _reduxActions.createAction)('ADD_TO_CART');
var removeFromCart = exports.removeFromCart = (0, _reduxActions.createAction)('REMOVE_FROM_CART');