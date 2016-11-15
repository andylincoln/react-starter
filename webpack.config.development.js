//   NODE_ENV = development

var path = require('path');
var webpack = require('webpack');

let config = {
  devServer: {
    context: __dirname,
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  devtool: 'source-map',
  entry: [
    './src/scripts/index.js'
  ],
  module: {
    loaders: [
      {  // JavaScript
        test: /\.js$/|/\.jsx$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/scripts'),
        loader: 'babel',
        // TODO: I don't think this preset query is necessary with babelrc present
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'development'"
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
