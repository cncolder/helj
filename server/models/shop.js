'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('./product');

var _toJson = require('./plugins/to-json');

var _toJson2 = _interopRequireDefault(_toJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:shop'); /**
                                                       * Food
                                                       *
                                                       * Main goods infomation in shop
                                                       */

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  disabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

schema.plugin(_toJson2.default);

exports.default = _mongoose2.default.model('Shop', schema);