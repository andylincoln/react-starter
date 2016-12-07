//   NODE_ENV = production

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');
const style =  path.join(parts.style_dir, "app.scss");

let config = merge(
  {
    entry: {
      app: [parts.app_dir, style]
    }
  },
  parts.common,
  {
    devtool: 'source-map'
  },
  parts.clean(parts.build_dir),
  parts.compile_app(),
  parts.minify(),
  parts.extractCSS(style),
  parts.setFreeVariable('process.env.NODE_ENV','production')

);

module.exports = validate(config, {
  quiet: true
});
