/**
 * Wechat OAuth router and middleware
 */

import Router from 'koa-router'
import config from '../config'
import User from '../models/user'
import wechatOAuth from '../lib/wechat-oauth'
import wechatApi from '../lib/wechat-api'
const log = require('../lib/debug')('app:routes:wechat')


const router = new Router({
    prefix: '/wechat',
  })
  .get('/authed', async ctx => {
    ctx.assert(ctx.isWechat, 403, 'wechat only')
    const code = ctx.query.code
    const result = await wechatOAuth.getAccessTokenAsync(code)
    const openid = result.data.openid
    const userinfo = await wechatApi.getUserAsync(openid)

    let user = (await User.findOne({
      'wechat.openid': openid,
    })) || new User()
    user.username = openid
    user.role = 'wechat'
    user.wechat = {
      ...user.wechat, ...userinfo,
    }
    await user.save()

    ctx.session.passport = {
      type: 'wechat',
      user: user.username,
    }

    await ctx.redirect(ctx.query.state)
  })

const routes = router.routes()

routes.checkToken = async(ctx, next) => {
  if (!ctx.session.wechat || !ctx.session.wechat.code) {
    let redirectUrl = `${config.rootUrl}/wechat/authed/`
    let url = ctx.iswx ? wechatOAuth.getAuthorizeURL(
      redirectUrl, ctx.url, 'snsapi_base'
    ) : wechatOAuth.getAuthorizeURLForWebsite(redirectUrl)
    return ctx.redirect(url)
  } else {
    // delete ctx.session.wechatToken.code
  }

  await next()
}


export default routes
