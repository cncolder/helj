import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import compiler, {
  config,
}
from './webpack-compiler'

export default webpackHotMiddleware(compiler)
