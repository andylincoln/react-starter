//   NODE_ENV = development

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");

const parts = require('./webpack.parts');
const style =  path.join(parts.style_dir, "app.css");

let config = merge(
  {
    entry: {
      app: [parts.app_dir, style]
    }
  },
  parts.common,
  parts.clean(parts.build_dir),
  parts.raw_html(),
  parts.setupCSS(style),
  parts.devServer(),
  parts.compile_app(),
  {
    devtool: 'eval-source-map',
    plugins: []
  },
  parts.setFreeVariable('process.env.NODE_ENV','development')
);

module.exports = validate(config, {
  quiet: true
});
