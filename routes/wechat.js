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
  .get('/authorize', async ctx => {
    ctx.assert(ctx.iswx, 403, 'wechat only')

    const code = ctx.query.code
    const result = await wechatOAuth.getAccessTokenAsync(code)
    const openid = result.data.openid
    const userinfo = await wechatApi.getUserAsync(openid)

    await User.findOne({
      'wechat.openid': openid,
    }).then(user => {
      user.update({
          wechat: userinfo,
        })
        // log('%o %o', user, userinfo)
      return user.save()
    })

    ctx.session.wechatToken = {
      code,
      openid,
      userinfo,
    }

    await ctx.redirect(ctx.query.state)
  })

const routes = router.routes()

routes.checkToken = async(ctx, next) => {
  if (!ctx.session.wechatToken || !ctx.session.wechatToken.code) {
    let url
    let redirectUrl = `${config.rootUrl}/wechat/authorize/`
    if (ctx.iswx) {
      url = wechatOAuth.getAuthorizeURL(
        redirectUrl, ctx.url, 'snsapi_base'
      )
    } else {
      url = wechatOAuth.getAuthorizeURLForWebsite(redirectUrl)
    }
    return ctx.redirect(url)
  } else {
    // delete ctx.session.wechatToken.code
  }

  await next()
}


export default routes
