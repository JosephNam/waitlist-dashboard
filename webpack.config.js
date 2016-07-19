const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    './client/src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, './client/output/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}

