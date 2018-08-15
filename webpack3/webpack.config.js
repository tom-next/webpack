const path = require("path")
const uglify = require('uglifyjs-webpack-plugin')  // 注意： 只能在正式打包的时候用
const htmlPlugins = require('html-webpack-plugin')

const extractTextPlugin = require("extract-text-webpack-plugin");
// CSS单独提取出来，方便以后更改。 但是webpack官方其实并不建议这样作，他们认为CSS就应该打包到JavasScript当中以减少http的请求数。
// extract-text-webpack-plugin插件很轻松的就把CSS文件分离了出来，但是CSS路径并不正确
// publicPath：是在webpack.config.js文件的output选项中，主要作用就是处理静态文件路径的。



// 重要的功能 消除未使用的css, 使用PurifyCSS可以大大减少CSS冗余,PurifyCSS-webpack要以来于purify-css这个包，所以这两个都需要安装。
// 因为我们需要同步检查html模板，所以我们需要引入node的glob对象使用。在webpack.config.js文件头部引入glob。
const glob = require('glob');
// 引入 purifycss-webpack
const PurifyCSSPlugin = require("purifycss-webpack");

var website ={
    publicPath:"http://localhost:9000/"  // 这里是解决我们在打包的时候用extract-text-webpack-plugin插件很轻松的就把CSS文件分离了出来，但是CSS路径并不正确
}

module.exports = {
    entry: {
        entry: './src/entry.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: website.publicPath,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use:["style-loader", "css-loader"],
                // include/exclude  可配置选择对应的文件来进行loader处理
                // use: [
                //     {
                //         loader: "style-loader",  // 用来处理 js 中的css文件  是用来处理css文件中的url()等
                //     },{
                //         loader: "css-loader",   // 用来将 css 中的文件 通过 @import 或者 url 的方式载入到我们的js 文件当中 它是用来将css插入到页面的style标签
                //             options: {
                //                 modules: true
                //              }
                //     },
                //         {
                //             loader: "postcss-loader"
                //         }
                // ]
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                       { loader: 'css-loader', options: { importLoaders: 1 } },
                       { loader: 'postcss-loader'}                  // css前面加前缀
                    ]
                }),
            },
            {
                test: /\.less$/,
                use: [{
                       loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }]
            },
            // {
            //     test: /\.less$/,
            //     use: extractTextPlugin.extract({
            //           use: [{
            //               loader: "css-loader"
            //           }, {
            //               loader: "less-loader"
            //           }],
            //           // use style-loader in development
            //           fallback: "style-loader"
            //       })
            // },
            {                               // 安装url-loader（配置我们如何处理图片） 和 file-loader（用来处理我们打包和开发中路径不一致的问题）
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: "url-loader",  // 注意: loader是不需要引入的. url-loader 中默认引入了 file-loader
                        options: {
                            limit: 5000,    // limit 的意思如果图片大于5000，就把图片自动拷贝过去生成一个路径，小于的时候就生成base 64
                            outputPath: "images/", // 打包生成 images 文件
                        }
                    }
                ],
            },
            {

                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'],    // 解决的问题就是在hmtl文件中引入<img>标签的问题。

            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    // options:{
                    //     presets:[                   // 增加 es6 支持,使用基于 js 进行了扩展的语言
                    //         "es2015","react"
                    //     ]
                    // }
                },
                exclude:/node_modules/
            },
        ]
    },
    plugins:[
        // new uglify(),  // 只能在正式打包的时候用

        new htmlPlugins({
            minify: {
                removeAttributeQuotes: true // 让我们的html文件id里面的双引号都去掉，减少代码量
            },
            hash: true, // 生成的 js 带hash值
            template: "./src/index.html",
        }),
        new extractTextPlugin("css/index.css"),  // 分离css出来  css/index.css 是分离之后的路径位置

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!  使用这个插件必须配合extract-text-webpack-plugin这个插件，
            // 主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。 这个功能对打包css比较重要
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
    ],
    devServer:{
        contentBase: path.resolve(__dirname, "dist"),
        host: "localhost",
        compress: true,
        port: 9000
    }
}
