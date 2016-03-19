'use strict';

/**
 * Debug
 */

var debug = require('debug');

debug.log = console.log.bind(console);

/**
 * Export
 */

module.exports = function (namespace) {
  var log = debug(namespace);

  // TODO What the fuck! Who touch DEBUG?
  if ('darwin' == process.platform) debug.enable(process.env.DEBUG);

  log.log = log.l = console.log.bind(console);
  log.warn = log.w = console.warn.bind(console);
  log.error = log.err = log.e = console.error.bind(console);

  return log;
};