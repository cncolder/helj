import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const changeUsername = createAction('CHANGE_USERNAME')
export const changePassword = createAction('CHANGE_PASSWORD')
export const loginUser = createAction('LOGIN_USER', api.postLoginUser)
export const logoutUser = createAction('LOGOUT_USER', api.getLogoutUser)
