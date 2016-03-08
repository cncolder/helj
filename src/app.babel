/**
 * import
 */

import models from './models'
import './models/fixture'
import './lib/error'
import convert from 'koa-convert'
import Koa from 'koa'
import IO from 'koa-socket'
import ioAdapterMongo from './lib/io-adapter-mongo'
import koaSocketRequest from './lib/koa-socket-request'
import middlewares, {
  io as middlewaresIO
}
from './middlewares'
const log = require('./lib/debug')('app:app')

/**
 * app
 */

const app = new Koa()

/**
 * app setup
 */

// use following snippet to make migration easier.
// https://github.com/gyson/koa-convert#migration
const _appUse = app.use
app.use = mw => _appUse.call(app, convert(mw))

/**
 * app settings
 */

app.proxy = true
app.keys = ['wolongang']

/**
 * app middlewares
 */

app.use(middlewares)

/**
 * io
 */

const io = new IO()

/**
 * io setup
 */

// use following snippet to make migration easier.
// https://github.com/gyson/koa-convert#migration
// const _ioUse = io.use
// io.use = mw => _ioUse.call(io, convert(mw))

const context = require('koa/lib/context')
io.context = Object.create(context)

io.attach(app)
io.socket.adapter(ioAdapterMongo)
koaSocketRequest(app, io)

/**
 * io middlewares
 */

io.use(middlewaresIO)

io.on('join', (ctx, data) => {
  log('join event fired %o', data)
})

io.on('error', log)

io.on('request', (ctx, data) => {
  ctx.acknowledge(null, {
    status: ctx.status,
    data: ctx.body,
  })
})

/**
 * server
 */

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.server.listen(PORT, HOST, () => {
  log(`Server listening at http://${HOST}:${PORT}`)
})
