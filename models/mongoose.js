import mongoose from 'mongoose'
const log = require('debug')('app:models:mongoose')


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('error', log)
mongoose.connection.on('open', () => log('connection open'))
mongoose.connection.on('close', () => log('connection close'))


export default mongoose
