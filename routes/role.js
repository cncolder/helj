const log = require('debug')('app:routes:role')


export default {
  0: 0,

  is(type) {
    return (ctx, next) => {
      try {
        switch (type) {
          case 'guest':
            return next()
          case ctx.req.user.role:
            return next()
          default:
            ctx.status = 401
        }
      } catch (err) {
        ctx.status = 401
      }
    }
  },

  can(type) {
    return (ctx, next) => {
      let user = ctx.req.user

      try {
        switch (type) {
          case 'access public page':
            return next()

          case 'access wechater page':
            if (~['wechater'].indexOf(user.role))
              return next()
            else
              return ctx.status = 401

          case 'access manager page':
            if (~['manager', 'admin'].indexOf(user.role))
              return next()
            else
              return ctx.status = 401

          case 'access admin page':
            if (~['admin'].indexOf(user.role))
              return next()
            else
              return ctx.status = 401

          default:
            ctx.status = 401
        }
      } catch (err) {
        ctx.status = 401
      }

    }
  },

}
