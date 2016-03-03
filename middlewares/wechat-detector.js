/**
 * Wechat user agent detector
 */

const log = require('../lib/debug')('app:middlewares:wechat-detector')


export default async(ctx, next) => {
  // Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B440 MicroMessenger/6.1.4 NetType/WIFI
  ctx.iswx = /micromessenger/i.test(ctx.req.headers['user-agent'])

  await next()
}
