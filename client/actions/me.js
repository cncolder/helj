import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const getWhoami = createAction('GET_WHOAMI', api.getWhoami)
export const updateMyEmail = createAction('UPDATE_MY_EMAIL', api.putMyEmail)
export const updateMyPhone = createAction('UPDATE_MY_PHONE', api.putMyPhone)
