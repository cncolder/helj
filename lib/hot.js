const log = require('debug')('app:lib:hot')

const cwd = process.cwd()

let hot = () => {}

if ('development' == process.env.NODE_ENV) {
  const log = debug('app:lib:watch')
  const chokidar = require('chokidar')
  const anymatch = require('anymatch')
  const ignored = [
    /[\/\\]\./,
    /\.git/,
    /\.DS_Store$/,
    /\.editorconfig$/,
    /\.git/,
    /\.gitignore$/,
    /\.jscsrc$/,
    /app\.js$/,
    /lib\/watch\.js/,
    /gulpfile/,
    /node_modules/,
    /public/,
    /\.md/,
    /test/,
    /views/,
  ]
  const watcher = chokidar.watch('.', {
    ignored,
  })

  let app, io
  let reuse = () => {
    if (app) {
      app.middleware = []
        // app.use(require('../middlewares').default)
        // app.use(require('../routes').default)
    }

    if (io) {
      io.middleware = []
        // io.use(require('../middlewares').io)
        // io.use(require('../routes').io)
    }
  }

  watcher.on('ready', () => {
    const getWatched = watcher.getWatched()
    log('Watching %o', getWatched)

    watcher.on('all', () => {
      let reloaded = Object.keys(require.cache)
        .filter(id => {
          return ~id.indexOf('middlewares') || ~id.indexOf('routes')
        })
        .map(id => {
          delete require.cache[id]
          return id.replace(cwd, '')
        })
      log('Clearing module cache from server: %o', reloaded)

      setImmediate(reuse)
    })
  })

  hot = (...args) => {
    for (const arg of args) {
      const name = arg.constructor.name

      if ('Application' == name) {
        app = arg
        app.callback = function() {
          if (!this.listeners('error').length) this.on('error', this.onerror)

          return (req, res) => {
            res.statusCode = 404
            const ctx = this.createContext(req, res)
            onFinished(res, ctx.onerror)
            compose(this.middleware)(ctx).then(() => respond(ctx)).catch(ctx.onerror)
          }
        }
      }

      if ('IO' == name) io = arg
    }
  }
}

export default hot
