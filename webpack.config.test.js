//   NODE_ENV = test

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

let config = merge(
  parts.common,
  parts.clean(parts.build_dir),
  parts.babel_compile(),
  parts.devServer(),
  {
    devtool: 'source-map',
    plugins: []
  },
  parts.setFreeVariable('process.env.NODE_ENV','test')
);

module.exports = config;
