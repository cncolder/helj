'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

require('./models/fixture');

require('./lib/error');

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSocket = require('koa-socket');

var _koaSocket2 = _interopRequireDefault(_koaSocket);

var _ioAdapterMongo = require('./lib/io-adapter-mongo');

var _ioAdapterMongo2 = _interopRequireDefault(_ioAdapterMongo);

var _koaSocketRequest = require('./lib/koa-socket-request');

var _koaSocketRequest2 = _interopRequireDefault(_koaSocketRequest);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('./lib/debug')('app:app');

/**
 * app
 */

/**
 * import
 */

var app = new _koa2.default();

/**
 * app setup
 */

// use following snippet to make migration easier.
// https://github.com/gyson/koa-convert#migration
var _appUse = app.use;
app.use = function (mw) {
  return _appUse.call(app, (0, _koaConvert2.default)(mw));
};

/**
 * app settings
 */

app.proxy = true;
app.keys = ['wolongang'];

/**
 * app middlewares
 */

app.use(_middlewares2.default);

/**
 * io
 */

var io = new _koaSocket2.default();

/**
 * io setup
 */

// use following snippet to make migration easier.
// https://github.com/gyson/koa-convert#migration
// const _ioUse = io.use
// io.use = mw => _ioUse.call(io, convert(mw))

var context = require('koa/lib/context');
io.context = (0, _create2.default)(context);

io.attach(app);
io.socket.adapter(_ioAdapterMongo2.default);
(0, _koaSocketRequest2.default)(app, io);

/**
 * io middlewares
 */

io.use(_middlewares.io);

io.on('join', function (ctx, data) {
  log('join event fired %o', data);
});

io.on('error', log);

io.on('request', function (ctx, data) {
  ctx.acknowledge(null, {
    status: ctx.status,
    data: ctx.body
  });
});

/**
 * server
 */

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || 'localhost';

app.server.listen(PORT, HOST, function () {
  log('Server listening at http://' + HOST + ':' + PORT);
});