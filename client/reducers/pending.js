'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pending reducer
 */

var log = require('debug')('client:reducers:pending');

exports.default = (0, _reduxActions.handleActions)({
  GET_WHOAMI_PENDING: function GET_WHOAMI_PENDING(state) {
    return (0, _extends3.default)({}, state, { whoami: true
    });
  },
  GET_WHOAMI: function GET_WHOAMI(state) {
    return (0, _extends3.default)({}, state, { whoami: false
    });
  },

  GET_CURRENT_PHASE_PENDING: function GET_CURRENT_PHASE_PENDING(state) {
    return (0, _extends3.default)({}, state, { currentPhase: true
    });
  },
  GET_CURRENT_PHASE: function GET_CURRENT_PHASE(state) {
    return (0, _extends3.default)({}, state, { currentPhase: false
    });
  },

  GET_LATEST_DIVI_PHASE_PENDING: function GET_LATEST_DIVI_PHASE_PENDING(state) {
    return (0, _extends3.default)({}, state, { latestDiviPhase: true
    });
  },
  GET_LATEST_DIVI_PHASE: function GET_LATEST_DIVI_PHASE(state) {
    return (0, _extends3.default)({}, state, { latestDiviPhase: false
    });
  },

  GET_MY_POTS_PENDING: function GET_MY_POTS_PENDING(state) {
    return (0, _extends3.default)({}, state, { myPots: true
    });
  },
  GET_MY_POTS: function GET_MY_POTS(state) {
    return (0, _extends3.default)({}, state, { myPots: false
    });
  },

  GET_MY_BETS_PENDING: function GET_MY_BETS_PENDING(state) {
    return (0, _extends3.default)({}, state, { myBets: true
    });
  },
  GET_MY_BETS: function GET_MY_BETS(state) {
    return (0, _extends3.default)({}, state, { myBets: false
    });
  },

  PAY_BET_PENDING: function PAY_BET_PENDING(state) {
    return (0, _extends3.default)({}, state, { payBet: true
    });
  },
  PAY_BET: function PAY_BET(state) {
    return (0, _extends3.default)({}, state, { payBet: false
    });
  },

  GET_MY_REFERRER_PENDING: function GET_MY_REFERRER_PENDING(state) {
    return (0, _extends3.default)({}, state, { myReferrer: true
    });
  },
  GET_MY_REFERRER: function GET_MY_REFERRER(state) {
    return (0, _extends3.default)({}, state, { myReferrer: false
    });
  },

  GET_MY_FOLKS_PENDING: function GET_MY_FOLKS_PENDING(state) {
    return (0, _extends3.default)({}, state, { myFolks: true
    });
  },
  GET_MY_FOLKS: function GET_MY_FOLKS(state) {
    return (0, _extends3.default)({}, state, { myFolks: false
    });
  },

  GET_MY_TICKETS_PENDING: function GET_MY_TICKETS_PENDING(state) {
    return (0, _extends3.default)({}, state, { myTickets: true
    });
  },
  GET_MY_TICKETS: function GET_MY_TICKETS(state) {
    return (0, _extends3.default)({}, state, { myTickets: false
    });
  },

  GET_MY_TRANSACTIONS_PENDING: function GET_MY_TRANSACTIONS_PENDING(state) {
    return (0, _extends3.default)({}, state, { transactions: true
    });
  },
  GET_MY_TRANSACTIONS: function GET_MY_TRANSACTIONS(state) {
    return (0, _extends3.default)({}, state, { transactions: false
    });
  },

  SAVE_TICKET_PENDING: function SAVE_TICKET_PENDING(state) {
    return (0, _extends3.default)({}, state, { saveTicket: true
    });
  },
  SAVE_TICKET: function SAVE_TICKET(state) {
    return (0, _extends3.default)({}, state, { saveTicket: false
    });
  },

  SAVE_PASSWORD_PENDING: function SAVE_PASSWORD_PENDING(state) {
    return (0, _extends3.default)({}, state, { savePassword: true
    });
  },
  SAVE_PASSWORD: function SAVE_PASSWORD(state) {
    return (0, _extends3.default)({}, state, { savePassword: false
    });
  },

  SAVE_PIN_PENDING: function SAVE_PIN_PENDING(state) {
    return (0, _extends3.default)({}, state, { savePin: true
    });
  },
  SAVE_PIN: function SAVE_PIN(state) {
    return (0, _extends3.default)({}, state, { savePin: false
    });
  },

  SAVE_FOLK_PENDING: function SAVE_FOLK_PENDING(state) {
    return (0, _extends3.default)({}, state, { saveFolk: true
    });
  },
  SAVE_FOLK: function SAVE_FOLK(state) {
    return (0, _extends3.default)({}, state, { saveFolk: false
    });
  }
}, {});