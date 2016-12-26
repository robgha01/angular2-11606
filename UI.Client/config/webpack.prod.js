var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AutoPrefixer = require("autoprefixer");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");
var chalk = require("chalk");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

/**
 * Webpack Constants
 */
var OutputPath = helpers.root("dist");

module.exports = webpackMerge(commonConfig,
{
    devtool: "source-map",

    output: {
        path: OutputPath,
        publicPath: "/",
        filename: "static/assets/[name].min.js"
    },
    
    plugins: [
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:msg)",
            clear: false
        }),

        // plugins configuration for webpack 2
        new webpack.LoaderOptionsPlugin({
            options: {
                debug: false,
                context: helpers.root("src"), // this controls the root of [path] for loaders.
                output: OutputPath,

                htmlLoader: {
                    minimize: false // workaround for ng2
                },

                fileLoader: {
                    name: "static/[path][name].[ext]"
                },

                sassLoader: {
                    data: "$env: " + process.env.NODE_ENV + ";"
                },

                imagemin: {
                    gifsicle: { interlaced: false },
                    jpegtran: {
                        progressive: true,
                        arithmetic: false
                    },
                    optipng: { optimizationLevel: 5 },
                    pngquant: {
                        floyd: 0.5,
                        speed: 2
                    },
                    svgo: {
                        plugins: [
                          { removeTitle: true },
                          { convertPathData: false }
                        ]
                    }
                },

                /**
                 * PostCSS
                 * Reference: https://github.com/postcss/autoprefixer-core
                 * Add vendor prefixes to your css
                 */
                postcss: [
                    AutoPrefixer({
                        browsers: ["last 2 version"]
                    })
                ]
            }
        }),

        new webpack.NoErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),

        //new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        //    beautify: false,
        //    comments: false,
        //    compress: {
        //        screw_ie8: true
        //    },
        //    mangle: {
        //        screw_i8: true,
        //        keep_fnames: true
        //    }
        //}),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextPlugin({ filename: "static/assets/[name].css", allChunks: true })
    ]
});