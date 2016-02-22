/**
 * Routers
 *
 * Import all routers at here.
 */

import Router from 'koa-router'
import compose from 'koa-compose'
import role from './role'
import auth from './auth'
import me from './me'
import browserError from './browser-error'
const log = require('debug')('app:routes')

/**
 * Index router
 */

const router = new Router()
  .use(role.can('access home page'))
  .get('/', async ctx => {
    // Use this for send a init session to client. Socket.io use koa session id as identity. It allow passport auth in the future.
    ctx.session.io = ''
      // ctx.render('index', {
      //   env: {
      //     NODE_ENV: process.env.NODE_ENV,
      //   },
      // })
      // ctx.status = 200
  })
  .get('/test', ctx => {
    ctx.body = 'test!'
  })
  .get('/error', ctx => {
    throw new Error(400)
  })

const index = router.routes()

export const io = compose([auth, me])

export default compose([index, browserError])
