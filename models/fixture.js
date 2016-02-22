/**
 * Fixture
 *
 * initialize database.
 */

import User from './user'
const log = require('debug')('app:models:fixture')

const fixture = {
  0: 0,

  common() {
    let promises = []

    Promise.all(promises).catch(() => {})
  },

  development() {
    this.common()
  },

  production() {
    this.common()
  },
}

export default () => {
  try {
    fixture[process.env.NODE_ENV || 'development']()
  } catch (err) {
    log(err)
  }
}
