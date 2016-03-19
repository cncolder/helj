import mongoose from 'mongoose'
import env from '../lib/env'
const log = require('../lib/debug')('app:models:mongoose')


mongoose.set('debug', env.dev)

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('error', log)
mongoose.connection.on('open', () => log('connection open'))
mongoose.connection.on('close', () => log('connection close'))


export default mongoose
