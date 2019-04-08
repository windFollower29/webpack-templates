
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  rules: [
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {

          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        // {
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {

        //   }
        // },
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
}