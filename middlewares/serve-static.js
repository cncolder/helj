import path from 'path'
import serveStatic from 'koa-static'
import convert from 'koa-convert'
import options from './options'
const log = require('debug')('app:middlewares:serve-static')

const opts = options.serveStatic
const staticRoot = opts.root
delete opts.root

export default convert(serveStatic(staticRoot, opts))
