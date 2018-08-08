const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

  module.exports = merge(common, {
      devtool: 'source-map',  // 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
      // plugins: [
      //     new UglifyJSPlugin({
      //         sourceMap: true
      //     }),
      //     new webpack.DefinePlugin({
      //         'process.env.NODE_ENV': JSON.stringify('production')
      //     })
      // ],
      mode: "production"
  });
