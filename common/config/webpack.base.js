const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const loader = require('./loader')

const isPro = require('./const').isPro

console.log('isPro', isPro, process.env.NODE_ENV)

let entries = []
let htmls = []

try {

  let files = []

  files = glob.sync("**/*.js", {
    cwd: path.resolve(__dirname, '../entry/')
  })

  entries = files.reduce((a, b) => {

    const { dir, name, ext } = path.parse(b)

    return {
      ...a,
      [`${dir.split('/').join('_')}${dir ? '-' : ''}${name}`]: path.resolve(__dirname, '../entry/', b)
    }

  }, {})
  // console.log('pages: ', entries)


  htmls = files.map(p => {

    const { dir, name, ext } = path.parse(p)

    const chunkname = `${dir.split('/').join('_')}${dir ? '-' : ''}${name}`

    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../pages', dir, name + '.html'),

      filename: `html/${dir}${dir ? '/' : ''}${chunkname}.html`,
      chunks: [chunkname],
      inject: true
    })
  })

  // console.log('htmls: ', htmls)


} catch (err) {
  console.log(chalk.red(err))
}



// return

const baseConf = {
  // context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  // entry: {
  //   client: './entry/client.js',
  //   server: './entry/server.js'
  //   // vender: ['layui-laydate']
  // },
  // entry: entries.reduce((a, b) => {
  //   return {
  //     ...a,
  //     [b.key]: b.path
  //   }
  // }, {}),
  entry: entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: isPro ? 'js/[name].[contenthash:8].js' : 'js/[name].[hash:8].js'
  },
  module: loader,
  resolve: {
    extensions: [' ', '.js', '.json', 'scss'],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    //   inject: true
    // }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CLIENT: JSON.stringify(true),
      SERVER: JSON.stringify(false)
    }),
    new MiniCssExtractPlugin({
      filename: isPro ? "[name].[contenthash:8].css" : '[name].css',
      // publicPath: './css',
      chunkFilename: "[id].css"
    }),
    new ManifestPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 0,
  //     cacheGroups: {
  //       'react': {
  //         test: /react[\\/]/, // 直接使用 test 来做路径匹配
  //         // chunks: "initial",
  //         name: "react",
  //         enforce: true,
  //       },
  //       // 'react-dom': {
  //       //   test: /react-dom/, // 直接使用 test 来做路径匹配
  //       //   chunks: "all",
  //       //   name: "react-dom",
  //       //   enforce: true,
  //       // }
  //     }
  //   },
  //   runtimeChunk: {
  //     name: "manifest",   // 启动代码
  //   },
  //   // runtimeChunk: 'single'
  // }
};

htmls.forEach(html => {

  baseConf.plugins.push(html)
})

module.exports = baseConf