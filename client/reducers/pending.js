/**
 * Pending reducer
 */

import {
  combineReducers
}
from 'redux'
import {
  handleActions,
}
from 'redux-actions'
const log = require('debug')('client:reducers:pending')


export default handleActions({
  GET_WHOAMI_PENDING: state => ({
    ...state, whoami: true,
  }),
  GET_WHOAMI: state => ({
    ...state, whoami: false,
  }),

  GET_CURRENT_PHASE_PENDING: state => ({
    ...state, currentPhase: true,
  }),
  GET_CURRENT_PHASE: state => ({
    ...state, currentPhase: false,
  }),

  GET_LATEST_DIVI_PHASE_PENDING: state => ({
    ...state, latestDiviPhase: true,
  }),
  GET_LATEST_DIVI_PHASE: state => ({
    ...state, latestDiviPhase: false,
  }),

  GET_MY_POTS_PENDING: state => ({
    ...state, myPots: true,
  }),
  GET_MY_POTS: state => ({
    ...state, myPots: false,
  }),

  GET_MY_BETS_PENDING: state => ({
    ...state, myBets: true,
  }),
  GET_MY_BETS: state => ({
    ...state, myBets: false,
  }),

  PAY_BET_PENDING: state => ({
    ...state, payBet: true,
  }),
  PAY_BET: state => ({
    ...state, payBet: false,
  }),

  GET_MY_REFERRER_PENDING: state => ({
    ...state, myReferrer: true,
  }),
  GET_MY_REFERRER: state => ({
    ...state, myReferrer: false,
  }),

  GET_MY_FOLKS_PENDING: state => ({
    ...state, myFolks: true,
  }),
  GET_MY_FOLKS: state => ({
    ...state, myFolks: false,
  }),

  GET_MY_TICKETS_PENDING: state => ({
    ...state, myTickets: true,
  }),
  GET_MY_TICKETS: state => ({
    ...state, myTickets: false,
  }),

  GET_MY_TRANSACTIONS_PENDING: state => ({
    ...state, transactions: true,
  }),
  GET_MY_TRANSACTIONS: state => ({
    ...state, transactions: false,
  }),

  SAVE_TICKET_PENDING: state => ({
    ...state, saveTicket: true,
  }),
  SAVE_TICKET: state => ({
    ...state, saveTicket: false,
  }),

  SAVE_PASSWORD_PENDING: state => ({
    ...state, savePassword: true,
  }),
  SAVE_PASSWORD: state => ({
    ...state, savePassword: false,
  }),

  SAVE_PIN_PENDING: state => ({
    ...state, savePin: true,
  }),
  SAVE_PIN: state => ({
    ...state, savePin: false,
  }),

  SAVE_FOLK_PENDING: state => ({
    ...state, saveFolk: true,
  }),
  SAVE_FOLK: state => ({
    ...state, saveFolk: false,
  }),
}, {})
