'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('default', ['pm2-dev', 'watch']);

_gulp2.default.task('watch', function () {
  _gulp2.default.watch('test/**/*.js', ['mocha']);
});

_gulp2.default.task('pm2-dev', function (cb) {
  _child_process2.default.spawn('pm2-dev', ['--raw', 'package.json'], {
    stdio: 'inherit',
    env: (0, _assign2.default)({}, process.env, {
      DEBUG: 'app:*,koa*,mquery,socket.io:*,-socket.io:client'
    })
  }).on('exit', cb);
});

_gulp2.default.task('mocha', function (cb) {
  _child_process2.default.spawn('mocha', [], {
    stdio: 'inherit'
  }).on('exit', function () {
    return cb();
  }); // ignore error bcs mocha print error.
});

process.on('SIGINT', function () {
  _child_process2.default.spawn('pm2', ['kill'], {
    stdio: 'inherit'
  }).on('exit', function () {
    return process.exit(0);
  });
});

process.on('uncaughtException', function (err) {
  _gulpUtil2.default.log('uncaughtException', err);
});