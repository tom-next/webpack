const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
