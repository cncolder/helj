/**
 * Food
 *
 * Main goods infomation in shop
 */

import mongoose from './mongoose'
import './product'
import toJSON from './plugins/to-json'
const log = require('../lib/debug')('app:models:shop')


const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }, ],
  disabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

schema.plugin(toJSON)


export default mongoose.model('Shop', schema)
