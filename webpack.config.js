'use strict'

const webpack = require('webpack')
const path = require('path')
const buildPath = path.resolve(__dirname, 'dist')
const args = require('yargs').argv

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const isProd = args.prod
const isDev = args.dev
const env = args.envFile
if (env) {
  // Load env file
  require('dotenv').config({ path: env })
}

const main = ['./src/site.js']
const common = ['./src/common.js']
let devtool

if (isDev) {
  main.push('webpack-dev-server/client?http://0.0.0.0:8080')
  devtool = 'source-map'
}

const plugins = [
  new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
    inject: 'body',
  }),
  new HtmlWebpackPlugin({
    template: './src/error.html',
    chunks: ['common'],
    inject: 'body',
    filename: 'error.html',
  }),
  new webpack.DefinePlugin({
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.ENABLE_GOOGLE_AUTH': JSON.stringify(process.env.ENABLE_GOOGLE_AUTH),
    'process.env.GTM_ID': JSON.stringify(process.env.GTM_ID),
  }),
]

if (isProd) {
  plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

module.exports = {
  entry: {
    main: main,
    common: common,
  },

  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
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
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: { exposes: ['$', 'jQuery'] },
      },
    ],
  },

  plugins: plugins,

  devtool: devtool,

  devServer: {
    static: { directory: buildPath },
    host: '0.0.0.0',
    port: 8080,
  },
}
