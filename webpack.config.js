const webpack = require('webpack')
const path = require('path')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'common.js'
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')
const config = {
    context: path.resolve(__dirname, 'src/assets/js'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'src/assets/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {moduels: false}]
                    ]
                }
            }]
        }, {
            test: /\.png$/,
            use: [{
                loader: 'url-loader',
                options: { limit: 8192 } // 10k 이하 이미지는 base64 문자열로 변환
            }]
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader','sass-loader']
        }],
        plugins: [
            new webpack.LoaderOptionsPlugin({
            options: {
                extractCSS,
                extractCommons
              }
            })
        ]
    }
}

module.exports = config
