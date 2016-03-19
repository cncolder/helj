/**
 * Error.toJSON
 * https://github.com/AVVS/error-tojson/blob/master/index.js
 */

Object.defineProperty(Error.prototype, 'toJSON', {

  configurable: true,

  // These two lines for avoid raise error when subclass rewrite toJSON method.
  // e.g. MongoError
  // https://github.com/petkaantonov/bluebird/issues/291#issuecomment-74121263
  writable: true,
  enumerable: true,

  value() {
    var obj = Object.getOwnPropertyNames(this)
      .reduce((alt, key) => {
        return Object.assign(alt, {
          [key]: this[key],
        })
      }, {})

    obj.name = this.name
    obj.stack = obj.stk
    return obj
  }

})

/**
 * Error.stk
 */

Object.defineProperty(Error.prototype, 'stk', {

  get() {
    return this.stack.split('\n').slice(0, 2).join('\n')
  }

})
