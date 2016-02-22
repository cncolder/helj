import session from 'koa-generic-session'
import options from './options'
const log = require('debug')('app:middlewares:session')

const opts = options.session

export default session(opts)
