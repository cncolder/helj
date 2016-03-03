import socket from './socket'
const log = require('debug')('client:lib:api')

/**
 * Auth
 */

export const getWhoami = () => socket.get('/auth/whoami')
export const postLoginUser = user => socket.post('/auth/login', user)
export const getLogoutUser = user => socket.get('/auth/logout')

/**
 * Shop
 */

export const getShop = () => socket.get('/shop')

/**
 * Me
 */

export const putMyEmail = email => socket.put('/me/email', email)
export const putMyPhone = phone => socket.put('/me/phone', phone)
