const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
            test: '/\.scss$/',
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                'es2015'
            ]
        }]
    },
    plugins :[
        new UglifyJSPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
}

module.exports = config
