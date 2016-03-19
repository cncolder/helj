import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import compiler, {
  config,
}
from './webpack-compiler'


export default webpackDevMiddleware(compiler, {
  // noInfo: true,
  // lazy: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    // errorDetails: false,
  },
})
