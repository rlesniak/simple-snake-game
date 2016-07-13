import path from 'path'
import webpack from 'webpack'
import LiveReloadPlugin from 'webpack-livereload-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import config from '../'

export default {
  target: 'web',
  entry: {
    bundle: [path.join(config.get('dir_src'), 'js', 'main.js')]
  },
  devtool: '#source-map',
  output: {
    path: path.join(config.get('dir_dist'), config.get('globals').__BASE__, 'js'),
    pathInfo: true,
    publicPath: `/${path.join(config.get('globals').__BASE__, 'js/')}`,
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        ),
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
    }),
    new LiveReloadPlugin(),
    new ExtractTextPlugin('main.css'),
  ],
}
