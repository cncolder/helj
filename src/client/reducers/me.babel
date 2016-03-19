/**
 * Me reducer
 */

import {
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:me')


export default handleActions({
  GET_WHOAMI: {
    next: (state, action) => ({
      ...state,
      ...action.payload,
        authed: true,
    }),
    throw: (state, action) => state,
  },

  LOGIN_USER: {
    next: (state, action) => ({
      ...state,
      ...action.payload,
        authed: true,
    }),
    throw: (state, action) => state,
  },

  LOGOUT_USER: {
    next: (state, action) => ({
      authed: false,
    }),
    throw: (state, action) => state,
  },
}, {})
