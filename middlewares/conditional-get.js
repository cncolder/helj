import conditionalGet from 'koa-conditional-get'
import options from './options'

const opts = options.conditionalGet

export default conditionalGet(opts)
