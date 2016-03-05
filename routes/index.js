/**
 * Routers
 *
 * Import all routers at here.
 */

import Router from 'koa-router'
import compose from 'koa-compose'
import config from '../config'
import wechatOAuth from '../lib/wechat-oauth'
import role from './role'
import auth from './auth'
import shop from './shop'
import me from './me'
import browserError from './browser-error'
import wechat from './wechat'
const log = require('../lib/debug')('app:routes')


const router = new Router()
  .use(role.can('access public page'))
  .get('/', async ctx => {
    // Use this for send a init session to client. Socket.io use koa session id as identity. It allow passport auth in the future.
    ctx.session.io = ''

    if (ctx.isWechat && !ctx.req.user) {
      const redirectUrl = `${config.rootUrl}/wechat/authed`
      const url = ctx.isWechat ? wechatOAuth.getAuthorizeURL(
        redirectUrl, ctx.url, 'snsapi_base'
      ) : wechatOAuth.getAuthorizeURLForWebsite(redirectUrl)
      return ctx.redirect(url)
    }

    ctx.render('index', {
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    })
    ctx.status = 200
  })

const index = router.routes()

export const io = compose([auth, shop, me])


export default compose([
  index, shop, wechat, browserError,
])
