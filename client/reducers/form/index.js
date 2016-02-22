/**
 * Form reducer
 */

import {
  combineReducers
}
from 'redux'
import login from './login'
const log = require('debug')('client:reducers:form')


export default combineReducers({
  login,
})
