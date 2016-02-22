import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const getCurrentPhase = createAction('GET_CURRENT_PHASE', api.getCurrentPhase)
export const getWaitingPhases = createAction('GET_WAITING_PHASES', api.getWaitingPhases)
export const getLatestDiviPhase = createAction('GET_LATEST_DIVI_PHASE', api.getLatestDiviPhase)
export const getRecentlyPhases = createAction('GET_RECENTLY_PHASES', api.getRecentlyPhases)
