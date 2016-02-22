/**
 * Socket.IO
 */

import io from 'socket.io-client/socket.io'
const log = require('debug')('client:lib:socket')

const socket = io()

export default socket
