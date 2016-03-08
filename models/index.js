'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('./browser-error');

require('./configure');

require('./user');

require('./wechat-oauth-token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.models; /**
                                              * import all models
                                              */