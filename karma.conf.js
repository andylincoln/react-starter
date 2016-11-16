const webpack = require('webpack');
const path = require('path');

module.exports = function (config) {
  config.set({
    // to avoid DISCONNECTED messages
    autoWatch: true,
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 60000, //default 10000
    browsers: [ 'PhantomJS' ], //run in Chrome
    frameworks: [ 'mocha', 'chai' ],
    files: [
      'app/scripts/test/test_index.js' //just load this file,
    ],
    preprocessors: {
      'app/scripts/test/test_index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query:  {
              presets: ['react', 'es2015', 'stage-1']
            }
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
