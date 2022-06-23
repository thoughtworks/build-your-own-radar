const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const main = ['./src/site.js']

module.exports = merge(common, {
  mode: 'development',
  entry: { main: main },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify('development'),
    }),
  ],
  devtool: 'source-map',
})
