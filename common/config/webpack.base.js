const webpack = require('webpack')
const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const loader = require('./loader')

const isPro = require('./const').isPro

const clientConf = {
  context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  entry: {
    client: './entry/client.js',
    server: './entry/server.js'
    // vender: ['layui-laydate']
  },
  output: {
    path: path.join(__dirname, '../dist')
  },
  module: loader,
  resolve: {
    extensions: [' ', '.js', '.json', 'scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CLIENT: JSON.stringify(true),
      SERVER: JSON.stringify(false)
    }),
    new MiniCssExtractPlugin({
      filename: isPro ? "[name].[contenthash:8].css" : '[name].css',
      chunkFilename: "[id].css"
    }),
    new ManifestPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0
    },
    runtimeChunk: {
      name: "manifest",
    },
    // runtimeChunk: 'single'
  }
};

module.exports = clientConf