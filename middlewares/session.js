import session from 'koa-generic-session'
import config from '../config'
const log = require('../lib/debug')('app:middlewares:session')


const opts = config.session


export default session(opts)
