"use strict";


const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require("webpack");


const _SOURCE_DIR = "src";
const _OUTPUT_DIR = "dist";


const babelOptions = {
    plugins: [
        "syntax-dynamic-import",
        "transform-runtime", // Requires two packages: babel-plugin-transform-runtime (in dev) and babel-runtime (in deps).
    ],
    presets: ["es2015", "es2016", "es2017", "react"],
    retainLines: true,
};

/**
 * @module
 * This is a webpack2 configuration file.
 */
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, _OUTPUT_DIR),
        inline: true
    },
    devtool: "source-maps",
    entry: `./${_SOURCE_DIR}/index.ts`,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    },
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true,
                            useCache: true,
                            babelOptions
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                enforce: "pre",
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "source-map-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    }
                ]
            },
        ]
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, _OUTPUT_DIR)
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: process.env.NODE_ENV } }),
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new FaviconsWebpackPlugin({
            emitStats: false,
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: false,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            },
            inject: true,
            logo: "./src/star.png",
            persistentCache: true,
            prefix: ""
        }),
        new HtmlWebpackPlugin({ inject: "head", title: "Rich McNeary" })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    target: "web"
};
