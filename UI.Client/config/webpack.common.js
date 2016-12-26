var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var helpers = require("./helpers");

module.exports = function () {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = {
        "main": [
            "bootstrap-loader",
            "./src/typescript/polyfills.browser.ts",
            "./src/typescript/vendor.browser.ts",
            "./src/typescript/main.browser.ts"
        ]
    };

    /**
     * Externals http://localhost:3100/1.8b13a08ae0e028990f0b.hot-update.js
     * Define all external libraries that should not get included by webpack. "library":"acessor" ex: "jquery": "jQuery"
     * Reference: http://webpack.github.io/docs/configuration.html#externals
     */
    config.externals = [];

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html", ".webpack.js", ".web.js"],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root("src"), helpers.root("node_modules")]
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        /**
         * Reference: https://webpack.js.org/configuration/module/
         */
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.ts(x?)$/,
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/],
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },

            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file-loader!img-loader"
            },

            // Bootstrap 3
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: "imports-loader?jQuery=jquery"
            },

            // support for .html as raw text
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ]
    };

    if (helpers.isProduction) {
        // Support for CSS as raw text
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        config.module.rules.push({
            test: /\.css$/,
            exclude: helpers.root("src", "typescript"),
            loader: ExtractTextPlugin.extract({
                loader: ["css-loader", "postcss-loader"]
            })
        });

        // all css required in src/app files will be merged in js files
        config.module.rules.push({
            test: /\.css$/,
            include: helpers.root("src", "typescript"),
            loaders: ["raw-loader", "postcss-loader"]
        });

        // all css required in src/typescript files will be merged in js files
        config.module.rules.push(
        {
            test: /\.(scss|sass)$/,
            exclude: helpers.root("src", "sass"),
            loaders: ["raw-loader", "postcss-loader", "sass-loader"]
        });

        // support for .scss files
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/sass will be bundled in an external css file
        config.module.rules.push({
            test: /\.(scss|sass)$/,
            exclude: helpers.root("src", "typescript"),
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: ["css-loader", "postcss-loader", "sass-loader"]
            })
        });
    } else {
        config.module.rules.push({
            test: /\.css$/,
            loaders: ["style-loader", "css-loader", "postcss-loader"]
        });

        config.module.rules.push(
        {
            test: /\.(scss|sass)$/,
            loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        });
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root("./src") // location of your src
        ),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: ["polyfills", "vendor"].reverse()
        //}),

        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["common"],
            minChunks: function (module, count) {
                return !helpers.isExternal(module) && count >= 2; // adjustable cond
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            chunks: ["main", "common"], //Object.keys(config.entry).concat("common"),
            minChunks: function (module) {
                return helpers.isExternal(module);
            }
        }),

        /**
        * Plugin: DefinePlugin
        * Description: Define free variables.
        * Useful for having development builds with debug logging or adding global constants.
        *
        * Environment helpers
        *
        * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        */
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            "ENV": JSON.stringify(helpers.Env),
            "process.env": {
                "ENV": JSON.stringify(helpers.Env),
                "NODE_ENV": JSON.stringify(helpers.Env)
            }
        })
    ];

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    config.node = {
        global: true,
        crypto: "empty",
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

    return config;
}();