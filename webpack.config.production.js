//   NODE_ENV = production

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

let config = merge(
  {
    entry: {
      app: path.join(__dirname,'app', 'scripts'),
    }
  },
  parts.common,
  {
    devtool: 'source-map'
  },
  parts.clean(parts.build_dir),
  parts.compile_app(),
  parts.setFreeVariable('process.env.NODE_ENV','production')

);

module.exports = config;
