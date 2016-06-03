//  disable in es5 files for now
/*eslint-disable */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');


module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, '/src/index')
    },
    output: {
        filename: '[name]-[hash].min.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            '__DEV_TOOLS__': false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html'
        })
    ],
    resolve: {
        alias: {
            'assets': path.resolve('assets'),
            'node_modules': path.resolve('node_modules'),
            'components': path.resolve('src', 'components'),
            'common': path.resolve('src', 'components/common'),
            'constants': path.resolve('src', 'constants.js'),
            'utils': path.resolve('src', 'utils.js'),
            'actions': path.resolve('src', 'actions')
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules', 'components')]
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
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
    },
    postcss: [
        require('autoprefixer')
    ]
};

/*eslint-enable */
