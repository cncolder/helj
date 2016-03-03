import path from 'path'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import pkg from './package.json'


const version = pkg.version
const join = p => path.join(__dirname, p)
const PROD = 'production' == process.env.NODE_ENV

export default {
  entry: {
    client: PROD ? ['./client'] : [
      /**
       * https://github.com/glenjamin/webpack-hot-middleware#config
       *
       * path - The path which the middleware is serving the event stream on
       * timeout - The time to wait after a disconnection before attempting to reconnect
       * overlay - Set to false to disable the DOM-based client-side overlay.
       * reload - Set to true to auto-reload the page when webpack gets stuck.
       * noInfo - Set to true to disable informational console logging.
       * quiet - Set to true to disable all console logging.
       */
      'webpack-hot-middleware/client?reload=true&overlay=false',
      './client',
    ],
    vendor: [
      './client/style.less',
      'babel-polyfill',
      'debug',
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-actions',
      'redux-promise',
      'reselect',
      'socket.io-client/socket.io',
    ],
  },
  output: {
    path: join('./public/js/'),
    filename: 'client.js',
    publicPath: '/js/',
  },
  devtool: PROD ? [] : 'inline-source-map',
  module: {
    noParse: /socket\.io\-client/,
    loaders: [{
      test: /\.jsx?$/,
      include: /client|lib/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react', ],
        cacheDirectory: true,
        plugins: ['transform-runtime'],
      },
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss-loader!less?noIeCompat',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 10 * 1000, // 10kb
        minetype: 'application/font-woff',
      },
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file',
    }],
  },
  postcss: () => [autoprefixer],
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        VERSION: JSON.stringify(version),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      compressor: {
        warnings: false,
      },
    }),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        VERSION: JSON.stringify(version),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}
