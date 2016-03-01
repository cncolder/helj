import logger from 'koa-logger'
import config from '../config'


const opts = config.logger


export default logger(opts)
