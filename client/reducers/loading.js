/**
 * Loading reducer
 */

import {
  combineReducers
}
from 'redux'

import {
  handleActions,
}
from 'redux-actions'


const log = require('debug')('client:reducers:loading')

const loading = handleActions({
  GET_WHOAMI: (state, action) => false,
}, {
  true,
})


export default loading
