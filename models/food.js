/**
 * Food
 *
 * Main goods infomation in shop
 */

import mongoose from './mongoose'
const log = require('../lib/debug')('app:models:food')


const Schema = mongoose.Schema

const schema = new Schema({
  sku: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    uniq: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  desc: {
    type: String,
  },
  tags: {
    type: [{
      type: String,
      trim: true,
    }],
    default: [],
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  image: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})


export default mongoose.model('Food', schema)
