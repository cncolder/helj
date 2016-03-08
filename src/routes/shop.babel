import Router from 'koa-router'
import role from './role'
import Shop from '../models/shop'
import expect from '../lib/expect'
const log = require('../lib/debug')('app:routes:shop')


const router = new Router({
    prefix: '/shop',
  })
  .use(role.can('access public page'))
  .get('/', async ctx => {
    ctx.body = await Shop.findOne().populate({
      path: 'products',
      populate: {
        path: 'sample',
      },
    })
    ctx.status = 200
  })


export default router.routes()
