var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: [ 'Chrome', 'PhantomJS'], //run in Chrome
    // singleRun: true, //just run once by default
    frameworks: [ 'mocha', 'chai' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [{
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-1'],
            "plugins": [
              [
                "transform-strict-mode", {
                  "strict": false
                }
              ]
            ]
          }
        }]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
