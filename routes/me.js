import Router from 'koa-router'
import role from './role'
import expect from '../lib/expect'
const log = require('debug')('app:routes:me')


const router = new Router({
    prefix: '/me',
  })
  .use(role.can('access home page'))
  .put('/email', async(ctx, next) => {
    let email = ctx.req.body
    expect(email).param('email').to.not.be.empty
    await ctx.req.user.update({
      email
    })
    ctx.status = 200
  })
  .put('/phone', async(ctx, next) => {
    let phone = ctx.req.body
    expect(phone).param('phone').to.not.be.empty
    await ctx.req.user.update({
      phone
    })
    ctx.status = 200
  })


export default router.routes()
