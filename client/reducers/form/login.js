import {
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:form:login')


export default handleActions({
  CHANGE_USERNAME: (state, action) => ({
    ...state,
    username: action.payload.replace(/[^\w]/ig, ''),
      error: {},
  }),

  CHANGE_PASSWORD: (state, action) => ({
    ...state,
    password: action.payload,
      error: {},
  }),

  LOGIN_USER: {
    next: (state, action) => ({
      ...state,
      password: '',
        error: {},
    }),
    throw: (state, action) => ({
      ...state,
      error: action.payload.data || action.payload,
    }),
  },
}, {
  error: {},
})
