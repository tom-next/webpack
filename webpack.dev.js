  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');
  const path = require("path")

  module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        historyApiFallback: true // 任意的 404 响应都可能需要被替代为 index.html
    },
  });
