//   NODE_ENV = development

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
  parts.clean(parts.build_dir),
  parts.compile_app(),
  parts.setupCSS(),
  parts.devServer(),
  {
    devtool: 'eval-source-map',
    plugins: []
  },
  parts.setFreeVariable('process.env.NODE_ENV','development')
);

module.exports = config;
