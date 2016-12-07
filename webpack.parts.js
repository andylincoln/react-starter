const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//  Directory Variables
const build_dir = path.join(__dirname, 'dist');
const app_dir = path.join(__dirname, 'app');
const style_dir =  path.join(__dirname, 'app', 'styles');
const test_scripts_dir = path.join(__dirname, 'app', 'test');

exports.build_dir = build_dir
exports.app_dir = app_dir
exports.style_dir = style_dir;
exports.test_scripts_dir = test_scripts_dir;

// Common WebPack config settings
exports.common = {
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: 'assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
        "app",
        "node_modules"
      ]
  }
}
// Compile the given includes and not the excludes with Babel
exports.compile_app = function(include, exclude, query) {
  include = include || app_dir;
  exclude = exclude || [/node_modules/, test_scripts_dir];
  query = query || {
    "presets": ["react", "es2015", "stage-1"]
  };
  return {
    module: {
      loaders: [
        {  // JavaScript
          test: /\.js$/,
          exclude: exclude,
          include: include,
          loader: 'babel',
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

exports.setupCSS = function(paths=[style_dir]) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css', 'postcss'],
          include: paths
        }
      ]
    }
  };
}

exports.setupSASS = function(paths=[style_dir]) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader?sourceMap", "postcss-loader","sass-loader?sourceMap"],
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

// Extract CSS from basic CSS build
exports.extractCSS = function(paths=[app_dir]) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].css')
    ]
  };
}

// Extract CSS from Sass build after running through PostCSS for auto-prefixing.
exports.extractCSSfromSASS = function(paths=[app_dir]) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap")
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].css')
    ]
  };
}

// Use raw_html to mark an html file as part of the build
exports.raw_html = function() {
  return {
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: "raw-loader"
        }
      ]
    }
  };
}
