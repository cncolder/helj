'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('./sample');

require('./shop');

var _toJson = require('./plugins/to-json');

var _toJson2 = _interopRequireDefault(_toJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Food
 *
 * Main goods infomation in shop
 */

var log = require('../lib/debug')('app:models:product');

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  sample: {
    type: Schema.Types.ObjectId,
    ref: 'Sample',
    required: true
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  }
}, {
  timestamps: true
});

schema.plugin(_toJson2.default);

exports.default = _mongoose2.default.model('Product', schema);