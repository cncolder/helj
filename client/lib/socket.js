/**
 * Socket.IO promise
 */

import io from 'socket.io-client/socket.io'
const log = require('debug')('client:lib:socket')


const socket = io()

socket.request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      method, url, data,
    }, (err, res) => {
      log('err: %o res: %o', err, res)
      if (err) {
        reject(err)
      } else if (res.status >= 400) {
        reject(Object.assign(new Error(), res.data))
      } else {
        resolve(res.data)
      }
    })
  })
}

socket.get = (url) => socket.request('GET', url)
socket.post = (url, data) => socket.request('POST', url, data)
socket.put = (url, data) => socket.request('PUT', url, data)
socket.del = (url) => socket.request('DELETE', url)


socket.on('connect', () => log('connect'))
socket.on('error', e => log('error %o', e))
socket.on('disconnect', () => log('disconnect'))
socket.on('reconnect', e => log('reconnect %d', e))
socket.on('reconnect_attempt', () => log('reconnect_attempt'))
socket.on('reconnecting', e => log('reconnecting %d', e))
socket.on('reconnect_error', e => log('reconnect_error %o', e))
socket.on('reconnect_failed', () => log('reconnect_failed'))


export default socket
