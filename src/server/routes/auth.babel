import Router from 'koa-router'
import passport from 'koa-passport'
import role from './role'
const log = require('../lib/debug')('app:routes:auth')


const router = new Router({
    prefix: '/auth',
  })
  .use(role.can('access public page'))
  .get('/whoami', async ctx => {
    if (ctx.req.user) {
      ctx.body = ctx.req.user
      ctx.status = 200
    } else {
      ctx.status = 401
    }
  })
  .get('/logout', async ctx => {
    ctx.session = {}
    ctx.body = 'logout'
    ctx.status = 200
  })


export default router.routes()
