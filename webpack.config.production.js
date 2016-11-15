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
  parts.babel_compile()
);

module.exports = config;
