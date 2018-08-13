const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
      app: './src/index.js',
      vendor: [
          'lodash'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'webpack demo'
      }),
       new webpack.HashedModuleIdsPlugin(),   // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。管再添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致
      // new webpack.optimize.CommonsChunkPlugin({
      //  name: 'lodash' // 指定公共 bundle 的名称。            // webpack 3中使用 阻止重复, 比如多个文件用到了 loadsh, 我们可以提取lodash 到公共部分，避免在每个文件中都打进去
      // })
    ],
    optimization: {
      runtimeChunk: {
          name: "manifest"
      },
      splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,   // webpack4 采用这种方式将代码防止重复, 将公共部分提取出来放在 vendor 中
                name: "vendor",
                chunks: "all"
            },
        }
     }
 },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
  },
    module: {
        // 这部分是 loader 用来处理引入任何其他类型的文件.
        rules: [
            // 处理 样式的loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    }
};
