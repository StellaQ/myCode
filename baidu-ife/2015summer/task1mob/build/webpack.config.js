var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareConfig = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    // entry: './app.js',
    entry: {
        javascript: './app.js',
        html: './public/1.html'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    node: {
        fs: 'empty'
    },
    module: {
        loaders:[{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfig;























