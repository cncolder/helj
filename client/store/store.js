'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _env = require('../lib/env');

var _env2 = _interopRequireDefault(_env);

var _isPromise = require('../lib/is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _redux = require('redux');

var _reduxPromisePending = require('../lib/redux-promise-pending');

var _reduxPromisePending2 = _interopRequireDefault(_reduxPromisePending);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactRouterRedux = require('react-router-redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _initialState = require('./initial-state');

var _initialState2 = _interopRequireDefault(_initialState);

var _subscribeSocket = require('./subscribe-socket.io');

var _subscribeSocket2 = _interopRequireDefault(_subscribeSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Store singleton
 */

var log = require('debug')('client:store:store');

var middlewares = [_reduxPromisePending2.default, _reduxPromise2.default];

if (_env2.default.local) {
  middlewares.push((0, _reduxLogger2.default)({
    collapsed: true,
    duration: true,
    // Only output resolved promise result
    predicate: function predicate(state, action) {
      return !(0, _isPromise2.default)(action.payload) && !action.type.endsWith('_PENDING');
    }
  }));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

var reducer = (0, _redux.combineReducers)((0, _extends3.default)({}, _reducers2.default, {
  routing: _reactRouterRedux.routerReducer
}), _initialState2.default);

var store = _redux.applyMiddleware.apply(undefined, middlewares)(_redux.createStore)(reducer);

exports.default = store;