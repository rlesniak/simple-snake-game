/* eslint-disable no-var */
var path = require('path')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var webpack = require('webpack')

module.exports = {
  entry: './js/main',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
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
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new LiveReloadPlugin(),
  ],
}
