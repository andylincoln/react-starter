//   NODE_ENV = production

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require("webpack-validator");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  parts.extractCSSfromSASS(style),
  parts.compile_app(),
  parts.minify(),
  parts.setFreeVariable('process.env.NODE_ENV','production'),
  {
    plugins: [
       new CopyWebpackPlugin([
          { from: 'index.html', to: parts.build_dir },
       ])
    ]
  }
);

module.exports = validate(config, {
  quiet: true
});
