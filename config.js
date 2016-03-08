'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ms = require('ms');

var _ms2 = _interopRequireDefault(_ms);

var _koaGenericSessionMongo = require('koa-generic-session-mongo');

var _koaGenericSessionMongo2 = _interopRequireDefault(_koaGenericSessionMongo);

var _env = require('./lib/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  compress: {
    // filter: function(content_type) {
    //   return /text/i.test(content_type)
    // },
    // threshold: 2048,
    // flush: require('zlib').Z_SYNC_FLUSH
  },

  etag: {
    // weak: false,
  },

  serveStatic: {
    root: './public'
  },

  // defer: true,
  // maxAge: ms('1 day'),
  // defer: false,
  // hidden: false,
  // index: 'index.html',
  session: {
    cookie: {
      maxAge: null
    },
    store: new _koaGenericSessionMongo2.default({
      url: _env2.default.MONGO_URL
    })
  },

  react: {
    path: './views',
    extname: '.js',
    doctype: '<!DOCTYPE html>',
    cache: _env2.default.deploy,
    beautify: _env2.default.local
  },

  io: {
    // path: '/js',
  },

  wechat: {
    appid: _env2.default.WX_APPID,
    secret: _env2.default.WX_SECRET,
    token: _env2.default.WX_TOKEN,
    encodingAESKey: _env2.default.WX_AESKEY
  },

  rootUrl: _env2.default.ROOTURL
};

if (_env2.default.deploy) {
  opts.session.cookie.maxAge = (0, _ms2.default)('1 hour');
}

exports.default = opts;