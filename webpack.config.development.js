//   NODE_ENV = development

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');

let config = merge(
  {
    entry: {
      app: parts.app_dir,
    }
  },
  parts.common,
  parts.clean(parts.build_dir),
  parts.compile_app(),
  parts.extractCSS(parts.app_dir),
  parts.devServer(),
  {
    devtool: 'eval-source-map',
    plugins: []
  },
  parts.setFreeVariable('process.env.NODE_ENV','development')
);

module.exports = validate(config, {
  quiet: true
});
