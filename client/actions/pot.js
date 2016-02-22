import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const changePotAmount = createAction('CHANGE_POT_AMOUNT')
export const changePotKind = createAction('CHANGE_POT_KIND')
export const changePotCounter = createAction('CHANGE_POT_COUNTER')
export const changePotLoss = createAction('CHANGE_POT_LOSS')
export const changePotEarn = createAction('CHANGE_POT_EARN')
export const getMyPot = createAction('GET_MY_POT', api.getMyPot)
export const payPot = createAction('PAY_POT', api.postPayPot)
