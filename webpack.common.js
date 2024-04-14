'use strict'

const webpack = require('webpack')
const path = require('path')
const buildPath = path.resolve(__dirname, 'dist')
const args = require('yargs').argv

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = args.envFile
if (env) {
  // Load env file
  require('dotenv').config({ path: env })
}

const common = ['./src/common.js']

const ASSET_PATH = process.env.ASSET_PATH || '/'

const plugins = [
  new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
    inject: 'body',
  }),
  new webpack.DefinePlugin({
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.ENABLE_GOOGLE_AUTH': JSON.stringify(process.env.ENABLE_GOOGLE_AUTH),
    'process.env.GTM_ID': JSON.stringify(process.env.GTM_ID),
    'process.env.RINGS': JSON.stringify(process.env.RINGS),
    'process.env.QUADRANTS': JSON.stringify(process.env.QUADRANTS),
    'process.env.ADOBE_LAUNCH_SCRIPT_URL': JSON.stringify(process.env.ADOBE_LAUNCH_SCRIPT_URL),
  }),
]

module.exports = {
  context: __dirname,
  entry: {
    common: common,
  },
  output: {
    path: buildPath,
    publicPath: ASSET_PATH,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  resolve: {
    extensions: ['.js', '.ts'],
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
}
