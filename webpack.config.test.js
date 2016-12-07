const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');
const style = path.join(parts.style_dir, "app.scss");

let config = merge(
  {
    devtool: "inline-source-map"
  },
  parts.common,
  parts.setupSASS(style),
  parts.compile_app(
    parts.app_dir,
    (/node_modules/) // Exclude only the node_modules dir, include the test dir
  ),
  parts.setFreeVariable('process.env.NODE_ENV','test')
);

module.exports = validate(config, {
  quiet: true
});
