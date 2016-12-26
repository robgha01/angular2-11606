var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var AutoPrefixer = require("autoprefixer");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");
var chalk = require("chalk");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");
var constants = require("./constants");

/**
 * Webpack Constants
 */
var OutputPath = helpers.root("dist");

module.exports = webpackMerge(commonConfig,
{
    devtool: "cheap-module-source-map",

    output: {
        path: OutputPath,
        publicPath: constants.publicPath,
        filename: "assets/[name].js",
        chunkFilename: "[id].chunk.js"
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader"
            },

            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /(node_modules|bower_components)/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:msg)",
            clear: false
        }),
        
        new webpack.NoErrorsPlugin(),

        new BrowserSyncPlugin({
            server: {
                baseDir: ["src", "dist"],
                index: "index.html"
            },

            host: constants.browserSync.host,
            port: constants.browserSync.port,
            notify: false,

            /**
             * Clicks, Scrolls & Form inputs on any device will be mirrored to all others. if set to true
             */
            ghost: true
        },
        {
            // Plugin Options

            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false
        }),

        // plugins configuration for webpack 2
        new webpack.LoaderOptionsPlugin({
            options: {
                debug: true,
                context: helpers.root("src"), // this controls the root of [path] for loaders.
                output: OutputPath,

                htmlLoader: {
                    minimize: false // workaround for ng2
                },

                fileLoader: {
                    name: "[path][name].[ext]"
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
                 * Apply the tslint loader as pre/postLoader
                 * Reference: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
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
        })
    ]
});