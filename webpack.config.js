'use strict';

const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(__dirname, './dist');
const args = require('yargs').argv;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

let isProd = args.prod;
let isDev = args.dev;

let main = ['./src/site.js'];
let common = ['./src/common.js'];
let devtool;

if (isDev) {
    main.push('webpack-dev-server/client?http://0.0.0.0:8080');
    devtool = 'source-map';
}

let plugins = [
    new MiniCssExtractPlugin({filename: '[name].[hash].css'}),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
        inject: 'body'
    }),
    new HtmlWebpackPlugin({
        template: './src/error.html',
        chunks: ['common'],
        inject: 'body',
        filename: 'error.html'
    })
];

if (isProd) {
    plugins.push(
        new webpack.NoEmitOnErrorsPlugin()
    );
}

module.exports = {
    entry: {
        'main': main,
        'common': common
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },

    output: {
        path: buildPath,
        publicPath: '/',
        filename: '[name].[hash].js'
    },

    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use: [{loader: 'babel-loader'}]},
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                }, {
                    loader: 'postcss-loader', options: {
                        ident: 'postcss',
                        plugins: () => [
                            postcssPresetEnv({browsers: 'last 2 versions'}),
                            cssnano({preset: ['default', {discardComments: {removeAll: true}}]})
                        ]
                    }
                }, 'sass-loader'],
            },
            {
                test: /\.(png|jpg|ico)$/,
                exclude: /node_modules/,
                use: [{loader: 'file-loader?name=images/[name].[ext]&context=./src/images'}]
            }
        ]
    },

    plugins: plugins,

    devtool: devtool,

    devServer: {
        contentBase: buildPath,
        host: '0.0.0.0',
        port: 8080
    }
};

