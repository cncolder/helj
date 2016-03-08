/**
 * Err
 *
 * Error utils class
 */
import './error'


export default class Err extends Error {
  constructor(...args) {
    let name, message, extra
    for (let arg of args) {
      if ('string' == typeof arg) {
        if (/Error$/.test(arg) && !/\s/.test(arg)) {
          name = arg
        } else {
          message = arg
        }
      } else if ('object' == typeof arg) {
        extra = arg
      }
    }

    // Avoids settings null message
    // https://github.com/hapijs/boom/blob/master/lib/index.js#L88
    super(message || undefined)

    if (Error.captureStackTrace) Error.captureStackTrace(this, Err)

    if (name) this.name = name
    if (extra) Object.assign(this, extra)
  }
}
