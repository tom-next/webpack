const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  // entry: './src/index.js',
    entry: {
     app: './src/index.js',
     print: './src/print.js'
    },
    plugins: [
        // 插件功能,我们可以通过HtmlWebpackPlugin生成新的html文件替换原有的
     new HtmlWebpackPlugin({
       title: 'Output Management'
   }),
   new CleanWebpackPlugin(['dist']), // 清除dist下的文件
   ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // 这部分是loader 用来处理引入任何其他类型的文件.
        rules: [
            // 处理 样式的loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 处理图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {

            }
        ]
    }
};
