import logger from 'koa-logger'
import options from './options'

const opts = options.logger

export default logger(opts)
