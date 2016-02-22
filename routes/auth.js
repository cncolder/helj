import Router from 'koa-router'
import role from './role'
const log = require('debug')('app:routes:auth')


const router = new Router({
    prefix: '/auth',
  })
  .use(role.can('access home page'))
  .get('/whoami', async(ctx, next) => {
    if (ctx.req.user) {
      ctx.body = ctx.req.user
      ctx.status = 200
    } else {
      ctx.status = 401
    }
  })


export default router.routes()
