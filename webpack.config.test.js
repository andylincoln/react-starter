const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

let config = {
  devtool: 'inline-source-map', //just do inline source maps instead of the default
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query:  {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
}

module.exports = config;
