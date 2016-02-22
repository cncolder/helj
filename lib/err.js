/**
 * Err
 *
 * Error utils class
 */
import './error'

export default class Err extends Error {
  constructor(name = 'Error', message, extra = {}) {
    // Avoids settings null message
    // https://github.com/hapijs/boom/blob/master/lib/index.js#L88
    super(message || undefined)

    this.name = name
    Error.captureStackTrace(this, Err)
    Object.assign(this, extra)
  }
}
