import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const changeBetNumber = createAction('CHANGE_BET_NUMBER')
export const changeBetAmount = createAction('CHANGE_BET_AMOUNT')
export const payBet = createAction('PAY_BET', api.postPayBet)
