'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:middlewares:react');

var opts = _config2.default.react;
var viewsPath = _path2.default.join(process.cwd(), opts.path);

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.render = function (filename) {
              var locals = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

              var filepath = _path2.default.join(viewsPath, filename);

              if (! ~filepath.indexOf(viewsPath)) {
                var err = new Error('Cannot find view file ' + filename);
                err.code = 'REACT';
                throw err;
              }

              filepath += _path2.default.extname(filepath) ? '' : opts.extname;
              // Object.assign(locals, this.app.state || {})

              var markup = opts.doctype || '';
              try {
                var component = require(filepath);
                // Transpiled ES6 may export components as { default: Component }
                component = component.default || component;
                markup += _server2.default.renderToStaticMarkup(_react2.default.createElement(component, (0, _assign2.default)(locals, ctx.state)));

                if (opts.beautify) {
                  // NOTE: This will screw up some things where whitespace is important, and be subtly different than prod.
                  // markup = beautify.html(markup)
                }

                ctx.type = 'html';
                ctx.body = markup;
              } catch (err) {
                err.code = 'REACT';
                throw err;
              } finally {
                if (opts.cache) {
                  return;
                }
                (0, _keys2.default)(require.cache).forEach(function (module) {
                  var filename = require.cache[module].filename;
                  if (filename.startsWith(viewsPath) && _path2.default.extname(filename) == opts.extname) {
                    delete require.cache[module];
                  }
                });
              }
            };

            return _context.abrupt('return', next());

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;
  return function (_x, _x2) {
    return ref.apply(_this, arguments);
  };
}();