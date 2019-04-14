

const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const cc = require('./const')

// console.log('isReport', cc)

const baseConf = require('./webpack.base')

const proConf =  merge(baseConf, {

  plugins: [
    // new BundleAnalyzerPlugin()
  ]

})

// console.log(proConf)

module.exports = proConf