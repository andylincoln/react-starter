const webpack = require('webpack');
const path = require('path');
const test_config = require('./webpack.config.test');

module.exports = function (config) {
  config.set({
    // to avoid DISCONNECTED messages
    autoWatch: true,
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 60000, //default 10000
    browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ],
    frameworks: [ 'mocha', 'chai' ],
    files: [
      'app/test/test_index.js' //just load this file,
    ],
    preprocessors: {
      'app/test/test_index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: test_config,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
