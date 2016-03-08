'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _toJson = require('./plugins/to-json');

var _toJson2 = _interopRequireDefault(_toJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Food
 *
 * Main goods infomation in shop
 */

var log = require('../lib/debug')('app:models:sample');

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  sku: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    uniq: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  desc: {
    type: String
  },
  tags: {
    type: [{
      type: String,
      trim: true
    }],
    default: []
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  cover: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

schema.plugin(_toJson2.default);

exports.default = _mongoose2.default.model('Sample', schema);