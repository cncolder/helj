/**
 * Pot reducer
 */

import {
  combineReducers
}
from 'redux'
import {
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:pot')


export const form = handleActions({
  CHANGE_POT_AMOUNT: (state, action) => ({
    ...state,
    amount: parseInt(action.payload, 10),
  }),

  CHANGE_POT_KIND: (state, action) => ({
    ...state,
    kind: action.payload,
  }),

  CHANGE_POT_COUNTER: (state, action) => ({
    ...state,
    counter: Math.min(parseInt(action.payload, 10), 99),
  }),

  CHANGE_POT_LOSS: (state, action) => ({
    ...state,
    loss: parseInt(action.payload, 10),
  }),

  CHANGE_POT_EARN: (state, action) => ({
    ...state,
    earn: parseInt(action.payload, 10),
  }),

  PAY_POT: {
    next: (state, action) => ({
      ...state,
      amount: 0,
        error: {},
    }),
    throw: (state, action) => ({
      ...state,
      error: action.payload.data || action.payload,
    }),
  },
}, {
  amount: 0,
  kind: 'odd',
  counter: 1,
  loss: 0,
  earn: 0,
  error: {},
})

export const my = handleActions({
  GET_MY_POT: {
    next: (state, action) => [
      ...state,
      ...action.payload,
    ],
    throw: (state, action) => state,
  },

  PAY_POT: {
    next: (state, action) => [
      ...state,
      ...[action.payload].concat(state.my),
    ],
    throw: (state, action) => state,
  },
}, [])

export default combineReducers({
  form,
  my,
})
