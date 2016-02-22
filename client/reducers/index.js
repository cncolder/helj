import {
  combineReducers
}
from 'redux'

import loading from './loading'
import form from './form'
import currentPhase from './current-phase'
import waitingPhases from './waiting-phases'
import latestDiviPhase from './latest-divi-phase'
import recentlyPhases from './recently-phases'
import bet from './bet'
import pot from './pot'
import me from './me'


export default combineReducers({
  loading,
  form,
  currentPhase,
  waitingPhases,
  latestDiviPhase,
  recentlyPhases,
  bet,
  pot,
  me,
})
