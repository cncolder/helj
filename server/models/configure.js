'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:configure'); /**
                                                            * Configure
                                                            *
                                                            * System configure in database.
                                                            */

var schema = new _mongoose2.default.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: _mongoose2.default.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('Configure', schema);