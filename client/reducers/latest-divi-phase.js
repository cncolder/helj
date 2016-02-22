/**
 * Latest divi phase reducer
 */
import {
  handleAction,
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:latest-divi-phases')


export default handleActions({
  GET_LATEST_DIVI_PHASE: {
    next: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    throw: (state, action) => state,
  },
}, {})
