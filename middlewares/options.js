import ms from 'ms'
import MongoStore from 'koa-generic-session-mongo'

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
    defer: true,
    // maxAge: ms('1 day'),
    // defer: false,
    // hidden: false,
    // index: 'index.html',
  },

  session: {
    cookie: {
      maxage: ms('1 day'),
    },
    store: new MongoStore({
      url: process.env.MONGO_URL,
    }),
  },

  // session: {
  //   cookie: {
  //     maxage: ms('1 day'),
  //   },
  // },

  react: {
    path: './views',
    extname: '.jsx',
    doctype: '<!DOCTYPE html>',
    cache: 'production' == process.env.NODE_ENV,
    beautify: 'production' != process.env.NODE_ENV,
  },

  io: {
    // path: '/js',
  },
}

if ('production' == process.env.NODE_ENV) {
  // Object.assign(opts.static, {
  //   maxAge: ms('1 day'),
  // })
}

export default opts
