
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const baseConf = require('./webpack.base')

const devPro =  merge(baseConf, {

  output: {
    filename: '[name].[hash:8].js'
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    hot: true
  }

})

// console.log(devPro)

module.exports = devPro