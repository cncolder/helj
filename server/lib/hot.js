'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('./debug')('app:lib:hot');

var cwd = process.cwd();

var hot = function hot() {};

if ('development' == process.env.NODE_ENV) {
  (function () {
    var log = debug('app:lib:watch');
    var chokidar = require('chokidar');
    var anymatch = require('anymatch');
    var ignored = [/[\/\\]\./, /\.git/, /\.DS_Store$/, /\.editorconfig$/, /\.git/, /\.gitignore$/, /\.jscsrc$/, /app\.js$/, /lib\/watch\.js/, /gulpfile/, /node_modules/, /public/, /\.md/, /test/, /views/];
    var watcher = chokidar.watch('.', {
      ignored: ignored
    });

    var app = undefined,
        io = undefined;
    var reuse = function reuse() {
      if (app) {
        app.middleware = [];
        // app.use(require('../middlewares').default)
        // app.use(require('../routes').default)
      }

      if (io) {
        io.middleware = [];
        // io.use(require('../middlewares').io)
        // io.use(require('../routes').io)
      }
    };

    watcher.on('ready', function () {
      var getWatched = watcher.getWatched();
      log('Watching %o', getWatched);

      watcher.on('all', function () {
        var reloaded = (0, _keys2.default)(require.cache).filter(function (id) {
          return ~id.indexOf('middlewares') || ~id.indexOf('routes');
        }).map(function (id) {
          delete require.cache[id];
          return id.replace(cwd, '');
        });
        log('Clearing module cache from server: %o', reloaded);

        (0, _setImmediate3.default)(reuse);
      });
    });

    hot = function hot() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          var name = arg.constructor.name;

          if ('Application' == name) {
            app = arg;
            app.callback = function () {
              var _this = this;

              if (!this.listeners('error').length) this.on('error', this.onerror);

              return function (req, res) {
                res.statusCode = 404;
                var ctx = _this.createContext(req, res);
                onFinished(res, ctx.onerror);
                compose(_this.middleware)(ctx).then(function () {
                  return respond(ctx);
                }).catch(ctx.onerror);
              };
            };
          }

          if ('IO' == name) io = arg;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };
  })();
}

exports.default = hot;