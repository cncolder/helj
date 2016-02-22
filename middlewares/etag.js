import etag from 'koa-etag'
import opts from './options'

export default etag(opts.etag)
