/**
 * Current phase reducer
 */
import {
  handleAction,
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:current-phase')


export default handleActions({
  GET_CURRENT_PHASE: {
    next: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    throw: (state, action) => state,
  },
}, {})
