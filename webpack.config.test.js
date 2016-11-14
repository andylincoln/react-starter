var path = require('path');
var webpack = require('webpack');

module.exports = {
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
}
