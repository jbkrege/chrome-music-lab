/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require("webpack");
var path = require("path");
// var CopyWebpackPlugin = require('node_modules/copy-webpack-plugin');

// var model = require('app/data/models/group1-shard1of1.bin');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    "context": __dirname,
    entry: {
        "Main": "app/Main",
    },
    output: {
        filename: "./build/[name].js",
        chunkFilename: "./build/[id].js",
        sourceMapFilename : "[file].map",
    },
    resolve: {
        root: __dirname,
        modulesDirectories : ["style", "app", "third_party/Tone.js/", "third_party", "node_modules"],
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
      ] : [],
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     // query: {
            //     //     presets: ['es2015']
            //     // }
            // },
            {
                test: /\.scss$/,
                loader: "style!css!autoprefixer-loader!sass"
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.(png|gif)$/,
                loader: "url-loader",
            }, 
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader : "file-loader?name=images/font/[hash].[ext]"
            }
            // , {
            //     test: /\.bin$/,
            //     use: 'raw-loader'
            // }
        ]
    }
};