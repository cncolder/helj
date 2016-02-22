/**
 * Bet reducer
 */

import {
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:bet')


export default handleActions({
  CHANGE_BET_NUMBER: (state, action) => ({
    ...state,
    number: parseInt(action.payload, 10),
  }),

  CHANGE_BET_AMOUNT: (state, action) => ({
    ...state,
    amount: parseInt(action.payload, 10),
  }),

  PAY_BET: {
    next: (state, action) => ({
      number: 0,
      amount: 0,
      error: {},
    }),
    throw: (state, action) => ({
      ...state,
      error: action.payload.data || action.payload,
    }),
  },
}, {
  number: 0,
  amount: 0,
  error: {},
})
