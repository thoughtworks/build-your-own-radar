const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const main = ['./src/site.js']
const fs = require('fs')
const config = require('./src/config')['development']
const featureTogglesList = Object.keys(config.featureToggles)
const scssVariables = featureTogglesList.map((x) => `$${x}:${config.featureToggles[x]};`).join('\n')

fs.writeFileSync(path.join(__dirname, './src/stylesheets/_featuretoggles.scss'), scssVariables)

// main.push('webpack-dev-server/client?http://0.0.0.0:8080')

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
