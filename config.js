import ms from 'ms'
import MongoStore from 'koa-generic-session-mongo'
import env from './lib/env'


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
    root: './public',
    // defer: true,
    // maxAge: ms('1 day'),
    // defer: false,
    // hidden: false,
    // index: 'index.html',
  },

  session: {
    cookie: {
      maxAge: null,
    },
    store: new MongoStore({
      url: env.MONGO_URL,
    }),
  },

  react: {
    path: './views',
    extname: '.jsx',
    doctype: '<!DOCTYPE html>',
    cache: env.deploy,
    beautify: env.local,
  },

  io: {
    // path: '/js',
  },

  wechat: {
    appid: env.WX_APPID,
    secret: env.WX_SECRET,
    token: env.WX_TOKEN,
    encodingAESKey: env.WX_AESKEY,
  },

  rootUrl: env.ROOTURL,
}

if (env.deploy) {
  opts.session.cookie.maxAge = ms('1 hour')
}

export default opts
