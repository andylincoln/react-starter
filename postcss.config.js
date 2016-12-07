module.exports = {
  plugins: [
    require('postcss-smart-import')({ /* ...options */ }),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]
}
