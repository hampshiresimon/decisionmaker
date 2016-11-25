var webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/entry.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "react"],
        "plugins": ["react-hot-loader/babel"]
      },
    },{
  test:   /\.css$/,
  loader: 'style-loader!css-loader!postcss-loader'
}]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
          Promise: 'imports?this=>global!exports?global.Promise!promise-polyfill'
     })

  ]
}
