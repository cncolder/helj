import env from '../lib/env'
import compress from './compress'
import conditionalGet from './conditional-get'
import convert from 'koa-convert'
import etag from './etag'
import logger from './logger'
import passport, {
  io as passportIO,
}
from './passport'
import react from './react'
import responseTime from './response-time'
import serveStatic from './serve-static'
import session from './session'
import wechat from './wechat'
import wechatDetector from './wechat-detector'
import routes, {
  io as routesIO
}
from '../routes'
const log = require('../lib/debug')('app:middlewares')

let middlewaresForApp = [
  responseTime,
  logger,
  compress,
  conditionalGet,
  etag,
  serveStatic,
  session,
  // passport,
  react,
  wechatDetector,
  routes,
  wechat,
]

if (env.local) {
  middlewaresForApp = [
    require('./webpack-dev').default,
    require('./webpack-hot').default,
  ].concat(middlewaresForApp)
}

let middlewaresForIO = [
  session,
  // passportIO,
]

export const io = convert.compose(middlewaresForIO)

export default convert.compose(middlewaresForApp)
