import {
  handleActions,
}
from 'redux-actions'


export default handleActions({
  GET_SHOP: {
    next: (state, action) => ({
      ...state, ...action.payload, error: undefined,
    }),
    throw: (state, action) => ({
      ...state, error: action.payload,
    }),
  },
}, {})
