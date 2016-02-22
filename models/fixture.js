/**
 * Fixture
 *
 * initialize database.
 */

import env from '../lib/env'
import User from './user'
const log = require('debug')('app:models:fixture')

const fixture = {
  0: 0,

  common() {
    let promises = []

    Promise.all(promises).catch(() => {})
  },

  local() {},

  development() {
    this.common()
    this.local()
  },

  staging() {
    this.common()
    this.local()
  },

  production() {
    this.common()
  },
}

export default () => {
  try {
    fixture[env.env]()
  } catch (err) {
    log(err)
  }
}
