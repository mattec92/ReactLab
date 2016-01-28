var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');


module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: path.resolve(__dirname, 'testapp/app/main.js'),
    output: {
        path: path.resolve(__dirname, 'testapp/build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel', // The module to load. "babel" is short for "babel-loader"
            query: {
                presets: ['react', "es2015"]
            }
        }]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
    ]
};