'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var log = require('../lib/debug')('app:routes:role');

exports.default = {
  0: 0,

  is: function is(type) {
    return function (ctx, next) {
      try {
        switch (type) {
          case 'guest':
            return next();
          case ctx.req.user.role:
            return next();
          default:
            ctx.status = 401;
        }
      } catch (err) {
        ctx.status = 401;
      }
    };
  },
  can: function can(type) {
    return function (ctx, next) {
      var user = ctx.req.user;

      try {
        switch (type) {
          case 'access public page':
            return next();

          case 'access wechat page':
            if (~['wechat'].indexOf(user.role)) return next();else return ctx.status = 401;

          case 'access manager page':
            if (~['manager', 'admin'].indexOf(user.role)) return next();else return ctx.status = 401;

          case 'access admin page':
            if (~['admin'].indexOf(user.role)) return next();else return ctx.status = 401;

          default:
            ctx.status = 401;
        }
      } catch (err) {
        ctx.status = 401;
      }
    };
  }
};