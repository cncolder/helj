/**
 * Fixture
 *
 * initialize database.
 */

import pkg from '../package.json'
import env from '../lib/env'
import Configure from './configure'
import User from './user'
const log = require('../lib/debug')('app:models:fixture')

const fixture = {
  0: 0,

  common() {
    let promises = [this.version()]

    Promise.all(promises).catch(() => {})
  },

  version() {
    return Configure.findOne({
        key: 'version',
      })
      .then(cfg => {
        if (!cfg) {
          Configure.create({
            key: 'version',
            value: pkg.version
          })
        } else {
          if (cfg.version != pkg.version) {
            cfg.update({
              value: pkg.version,
            })
          }
        }
      })
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
