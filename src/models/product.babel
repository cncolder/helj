/**
 * Food
 *
 * Main goods infomation in shop
 */

import mongoose from './mongoose'
import './sample'
import './shop'
import toJSON from './plugins/to-json'
const log = require('../lib/debug')('app:models:product')


const Schema = mongoose.Schema

const schema = new Schema({
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  sample: {
    type: Schema.Types.ObjectId,
    ref: 'Sample',
    required: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
}, {
  timestamps: true,
})

schema.plugin(toJSON)


export default mongoose.model('Product', schema)
