//  disable in es5 files for now
/*eslint-disable */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        process.env.entry || './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: process.env.filename || 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), new webpack.DefinePlugin({
            __DEV_TOOLS__: true,
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'iCasa',
            filename: 'index.html',
            template: 'index.template.html'
        })
    ],
    resolve: {
        alias: {
            'assets': path.resolve('assets'),
            'node_modules': path.resolve('node_modules'),
            'components': path.resolve('src', 'components'),
            'layouts': path.resolve('src', 'layouts')
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname,
        }, {
            test: /\.css$/,
            loaders: ['style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]', 'postcss']
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass']
        }, {
            test: /\.json$/,
            loaders: ['json']
        }, {
            test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg|gif|mp4)$/,
            loader: "file-loader?name=img/img-[hash:6].[ext]"
        }, {
            test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
            loaders: [
                'transform-loader/cacheable?brfs',
                'transform-loader/cacheable?packageify'
            ]
        }, {
            test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
            loader: 'transform-loader/cacheable?ejsify'
        }]
    }
};

/*eslint-enable */
