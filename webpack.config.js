const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: './client/index.js',
    redact: './client/redact.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}