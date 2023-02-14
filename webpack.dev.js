const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const main = ['./src/site.js']
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const config = require('./src/config')
const featureTogglesList = Object.keys(config().development.featureToggles)
const scssVariables = featureTogglesList.map((x) => `$${x}:${config().development.featureToggles[x]};`).join('\n')

module.exports = merge(common, {
  mode: 'development',
  entry: { main: main },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: 'global', url: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({ browsers: 'last 2 versions' }),
                  cssnano({
                    preset: ['default', { discardComments: { removeAll: true } }],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: scssVariables
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify('development'),
    }),
  ],
  devtool: 'source-map',
})
