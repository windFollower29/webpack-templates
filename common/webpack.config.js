const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const loader = require('./loader')

const clientConf = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    client: './main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: loader,
  resolve: {
    extensions: [' ', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CLIENT: JSON.stringify(true),
      SERVER: JSON.stringify(false)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};

module.exports = clientConf