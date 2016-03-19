import path from 'path'
import serveStatic from 'koa-static'
import convert from 'koa-convert'
import config from '../config'
const log = require('../lib/debug')('app:middlewares:serve-static')


const opts = config.serveStatic
const staticRoot = opts.root
delete opts.root


export default convert(serveStatic(staticRoot, opts))
