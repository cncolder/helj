import debug from '../lib/debug'
import Router from 'koa-router'
import BrowserError from '../models/browser-error'


const log = debug('app:routes:browser-error')


const router = new Router({
    prefix: '/browser-error',
  })
  .get('/', async ctx => {
    try {
      await BrowserError.create({
        message: ctx.query.message,
        url: ctx.query.url,
        line: ctx.query.line,
        column: ctx.query.column,
        stack: ctx.query.stack,
        referer: ctx.header.referer,
        ua: ctx.header['user-agent'],
        lang: ctx.acceptsLanguages()[0],
        ip: ctx.ips.pop() || ctx.ip,
      })
      ctx.status = 201
    } catch (err) {
      log(err)
      ctx.status = 400
    }
  })

export default router.routes()
