/**
 * Configure
 *
 * System configure in database.
 */

import mongoose from './mongoose'
const log = require('../lib/debug')('app:models:configure')


const schema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
})


export default mongoose.model('Configure', schema);
