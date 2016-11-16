const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');
const style = path.join(parts.style_dir, "main.css");

let config = merge(
  {
    devtool: "inline-source-map"
  },
  parts.common,
  parts.setupCSS(style),
  parts.compile_app(
    parts.app_dir,
    (/node_modules/) // Exclude only the node_modules dir
  )
);

module.exports = validate(config, {
  quiet: true
});
