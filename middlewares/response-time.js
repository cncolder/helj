import responseTime from 'koa-response-time'
import options from './options'

const opts = options.responseTime

export default responseTime(opts)
