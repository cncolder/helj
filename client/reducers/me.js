'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('client:reducers:me'); /**
                                                   * Me reducer
                                                   */

exports.default = (0, _reduxActions.handleActions)({
  GET_WHOAMI: {
    next: function next(state, action) {
      return (0, _extends3.default)({}, state, action.payload, {
        authed: true
      });
    },
    throw: function _throw(state, action) {
      return state;
    }
  },

  LOGIN_USER: {
    next: function next(state, action) {
      return (0, _extends3.default)({}, state, action.payload, {
        authed: true
      });
    },
    throw: function _throw(state, action) {
      return state;
    }
  },

  LOGOUT_USER: {
    next: function next(state, action) {
      return {
        authed: false
      };
    },
    throw: function _throw(state, action) {
      return state;
    }
  }
}, {});