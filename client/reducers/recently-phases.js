/**
 * Recently phases reducer
 */

import {
  handleAction,
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:recently-phases')


export default handleActions({
  GET_RECENTLY_PHASES: {
    next: (state, action) => [
      ...action.payload
    ],
    throw: (state) => state,
  },
  GET_LATEST_DIVI_PHASE: {
    next: (state, action) => [
      action.payload,
      ...state,
    ],
    throw: (state) => state,
  },
}, [])
