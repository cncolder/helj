import compress from 'koa-compress'
import opts from './options'

export default compress(opts.compress)
