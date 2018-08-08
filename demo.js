// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
//
//
// module.exports = {
//   // entry: './src/index.js',
//   // 入口文件，即webpack从哪里开始构建我们的应用, 可以多页，也可以单页，多页用数组代替
//     entry: {
//      // app: './src/index.js',
//      // print: './src/print.js'
//      app: './src/index.js'
//     },
//     plugins: [
//     // 插件功能,我们可以通过HtmlWebpackPlugin生成新的html文件替换原有的
//         new HtmlWebpackPlugin({
//             title: 'Output Management'
//         }),
//         new CleanWebpackPlugin(['dist']), // 清除dist下的文件
//
//         // 帮助我们查看要修补的依赖, 两个都是属于 webpack 的内置功能。模式适应于webpack-dev-server
//         new webpack.NamedModulesPlugin(),
//         new webpack.HotModuleReplacementPlugin()
//    ],
//    devtool: 'inline-source-map', // source map （在打包源代码时, 可以通过该选项来追踪到错误和警告在源代码中的位置）
//    devServer: {
//        contentBase: "./dist",  //告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
//        hot: true                // 开发中启用热更
//    },
//    // 输出
//    output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: '/'
//     },
//     mode: "production", // 在webpack4 中，我们可以通过"mode" 来切换达到控制压缩输出, 以达到在 bundle 中删除他们
//     module: {
//         // 这部分是loader 用来处理引入任何其他类型的文件.
//         rules: [
//             // 处理 样式的loader
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             // 处理图片资源
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: [
//                     'file-loader'
//                 ]
//             },
//             {
//
//             }
//         ]
//     }
// };
//
//
// // 注：
// // 如果我们想要在打包的过程中删除掉未引用的模块，这样来减少构建包的大小体积，在webpack4中，我们可以在package.json 中
// // 的 “sideEffects” 属性来实现    "sideEffects": false 这样可以告知webpack ，可以安全地删除未用到的 export,
// // 如果有用到的，可以提供一个数组
// // 任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：
// /*
// {
//   "name": "your-project",
//   "sideEffects": [
//     "./src/some-side-effectful-file.js",
//     "*.css"
//   ]
// }
// */
