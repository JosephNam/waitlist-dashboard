const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    './client/src/app.jsx'
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
        test: [/\.js?$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.css$/,
        loader : 'style-loader!css-loader' 
      }
    ]
  }
}

