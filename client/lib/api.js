/**
 * Web api
 */

import socket from './socket'

/**
 * Logger
 */

const log = require('debug')('client:lib:api')

/**
 * Auth
 */

export const getWhoami = () => socket.get('/auth/whoami')
export const postLoginUser = user => socket.post('/auth/login', user)
export const getLogoutUser = user => socket.get('/auth/logout')

/**
 * Me
 */

export const putMyEmail = email => socket.put('/me/email', email)
export const putMyPhone = phone => socket.put('/me/phone', phone)

/**
 * Phase
 */

export const getCurrentPhase = () => socket.get('/phase/current')
export const getWaitingPhases = () => socket.get('/phase/waiting')
export const getLatestDiviPhase = () => socket.get('/phase/divi/latest')
export const getRecentlyPhases = () => socket.get('/phase/recently')

/**
 * Bet
 */

export const postPayBet = ante => socket.post('/bet/pay', ante)

/**
 * Pot
 */

export const getMyPot = () => socket.get('/pot/my')
export const postPayPot = pot => socket.post('/pot/pay', pot)
