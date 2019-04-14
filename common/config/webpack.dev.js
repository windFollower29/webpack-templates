
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const baseConf = require('./webpack.base')

const devPro =  merge(baseConf, {
  
  plugins: [

    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    // contentBase: path.resolve(__dirname, '../dist/html'),
    hot: true
  }

})

// console.log(devPro)

module.exports = devPro