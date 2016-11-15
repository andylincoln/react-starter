//   NODE_ENV = production

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

let config = merge(
  parts.common,
  {
    devtool: 'source-map'
  },
  parts.clean(parts.build_dir),
  parts.babel_compile(),
  parts.setFreeVariable('process.env.NODE_ENV','production')

);

module.exports = config;
