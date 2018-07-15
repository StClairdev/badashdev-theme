const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const mainEntryPath = path.resolve(__dirname, 'js/main.js')
const mainFooterEntryPath = path.resolve(__dirname, 'js/footer-main.js')
const jsPath = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: {
    "main": mainEntryPath,
    "main-footer": mainFooterEntryPath
  },
  output: {
    filename: '[name].min.js',
    path: jsPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      open: 'external',
      host: 'dev.badashdev.com',
      proxy: 'dev.badashdev.com',
      port: 8080
    }),
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].min.css' : '[name].[hash].min.css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
}
