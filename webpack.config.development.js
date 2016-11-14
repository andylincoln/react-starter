//   NODE_ENV = development

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      //  TODO Add CSS loaders here

      // JavaScript
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'development'"
      }
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};
