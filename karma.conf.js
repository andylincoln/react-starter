var webpack = require('webpack');
var webpack_config_test = require('./webpack.config.test');
module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: [ 'Chrome', 'PhantomJS'], //run in Chrome
    // singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'chai' ], //use the mocha test framework
    files: [
      'karma.tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: webpack_config_test,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
