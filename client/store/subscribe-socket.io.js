/**
 * Subscribe Socket.IO messages
 */

import {
  createAction
}
from 'redux-actions'
import socket from '../lib/socket'
const log = require('debug')('client:store:subscribe-socket.io')


export default store => {
  const dispatch = type => data => store.dispatch(createAction(type)(data))

  socket.on('/auth/whoami', dispatch('GET_WHOAMI'))
}
