const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

let config = merge(
  {
    devtool: "inline-source-map"
  },
  parts.compile_app(
    path.join(__dirname, 'app', 'scripts'), // Include
    (/node_modules/) // Exclude only the node_modules dir
  )
);

module.exports = config;
