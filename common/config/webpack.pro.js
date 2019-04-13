

const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConf = require('./webpack.base')

const proConf =  merge(baseConf, {

  output: {
    filename: '[name].[contenthash:8].js'
  },

  plugins: [
    // new BundleAnalyzerPlugin()
  ]

})

// console.log(proConf)

module.exports = proConf