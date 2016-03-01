/**
 * import
 */

import models from './models'
import fixture from './models/fixture'
import './lib/error'
import convert from 'koa-convert'
import Koa from 'koa'
import IO from 'koa-socket'
import ioAdapterMongo from './lib/io-adapter-mongo'
import middlewares, {
  io as middlewaresIO
}
from './middlewares'
const log = require('debug')('app:app')

/**
 * db fixtures
 */

fixture()

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
app.keys = ['wo long gang']

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
const _ioUse = io.use
  // io.use = mw => _ioUse.call(io, convert(mw))

io.attach(app)
io.socket.adapter(ioAdapterMongo)

/**
 * io middlewares
 */

io.use(middlewaresIO)

io.on('join', (ctx, data) => {
  log('join event fired %o', data)
})

io.on('error', log)

/**
 * server
 */

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.server.listen(PORT, HOST, () => {
  log(`Server listening at http://${HOST}:${PORT}`)
})
