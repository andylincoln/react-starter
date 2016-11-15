//   NODE_ENV = production

const path = require('path');
const webpack = require('webpack');

let config = {

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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};

module.exports = config;
