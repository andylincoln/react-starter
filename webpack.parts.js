const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.build_dir = path.join(__dirname, 'assets');

exports.common = {
  entry: {
    src: path.join(__dirname,'src', 'scripts'),
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: 'assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
        "",
        "src",
        "node_modules"
      ]
  }
}

exports.babel_compile = function(include, exclude, query) {
  include = include || path.join(__dirname, 'src/scripts');
  exclude = exclude || /node_modules/;
  query = query || {
    presets: ['react', 'es2015', 'stage-1']
  };
  return {
    module: {
      loaders: [
        {  // JavaScript
          test: /\.js$/|/\.jsx$/,
          exclude: exclude,
          include: include,
          loader: 'babel',
          // TODO: I don't think this preset query is necessary with babelrc present
          query: query
        }
      ]
    }
  }
}

exports.devServer = function(options={host: 'localhost', port: 8080}) {
  return {
    watchOptions: {
     // Delay the rebuild after the first change
     aggregateTimeout: 300,
     // Poll using interval (in ms, accepts boolean too)
     poll: 1000
   },
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        beautify: false,
        compress: {
          warnings: false,
        },
        mangle: {
          except: ['webpackJsonp'],
          // Don't care about IE8
          screw_ie8 : true,
        }
      })
    ]
  };
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}