/**
 * Waiting phases reducer
 */

import {
  handleAction,
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:waiting-phases')


export default handleActions({
  GET_WAITING_PHASES: {
    next: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    throw: (state, action) => state,
  },
}, {})
