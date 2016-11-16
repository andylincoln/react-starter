const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');

let config = merge(
  {
    devtool: "inline-source-map"
  },
  parts.compile_app(
    parts.app_dir,
    (/node_modules/) // Exclude only the node_modules dir
  )
);

module.exports = validate(config, {
  quiet: true
});
