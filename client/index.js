'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _subscribeSocket = require('./store/subscribe-socket.io');

var _subscribeSocket2 = _interopRequireDefault(_subscribeSocket);

var _containers = require('./containers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('client:index');

/**
 * Setup client
 */

(0, _reactTapEventPlugin2.default)();

// Create an enhanced history that syncs navigation events with the store
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, _store2.default);

(0, _subscribeSocket2.default)(_store2.default);

/**
 * Router.
 */

var provider = _react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', component: _containers.Layout },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _containers.App }),
      _react2.default.createElement(_reactRouter.Route, { path: 'me', component: _containers.Me }),
      _react2.default.createElement(_reactRouter.Route, { path: '*', component: _containers.NoMatch })
    )
  )
);

_reactDom2.default.render(provider, document.getElementById('client'));

// navigator.geolocation.getCurrentPosition(position => {
//   alert(`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`)
// })