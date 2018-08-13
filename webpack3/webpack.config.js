const path = require("path")
module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: "./src/entry2.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"],
                // include/exclude  可配置选择对应的文件来进行loader处理
            }
        ]
    },
    plugins:[

    ],
    devServer:{
        contentBase: path.resolve(__dirname, "dist"),
        host: "localhost",
        compress: true,
        port: 8000
    }
}
