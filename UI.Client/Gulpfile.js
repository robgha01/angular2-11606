/// <binding />
var Gulp = require("gulp"),
    Plugins = require("gulp-load-plugins")({
        pattern: ["gulp-*", "gulp.*", "vinyl-*", "del", "webpack-stream", "browser-sync"]
    }),
    BrowserSync = require("browser-sync").create(),
    webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    WebpackDevServer = require("webpack-dev-server"),
    stripAnsi = require("strip-ansi"),
    Options = require("./gulp/config"),
    helpers = require("./config/helpers"),
    constants = require("./config/constants");

// Default to dev
helpers.SetDevEnvironment();

require("load-gulp-tasks")(Gulp, Options, Plugins);

/**
 * Start development proxy server
 */
Gulp.task("watch-sync", function () {
    Options.webpack.requiredInstance.watch = true;

    // Add the webpack dev and webpack hot to main script.
    Options.webpack.config.entry.main.unshift("webpack-dev-server/client?" + Options.webpack.config.output.publicPath, "webpack/hot/dev-server");

    // Add the HotModuleReplacementPlugin.
    Options.webpack.config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

    var compiler = Options.webpack.requiredInstance(Options.webpack.config);
    var server = new WebpackDevServer(compiler,
    {
        // Reference: https://webpack.js.org/configuration/dev-server/
        // This is required and must be same as publicPath in webconfig.
        publicPath: Options.webpack.config.output.publicPath,
        
        /**
         * Enable special support for Hot Module Replacement
         * Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
         * Use "webpack/hot/dev-server" as additional module in your entry point
         * Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
         */
        hot: true,

        /**
         * Set this if you want to enable gzip compression for assets.
         */
        //compress: true,
        
        /**
         * Console output
         * Values: { colors: true } "errors-only"
         */
        stats: { colors: true, cached: false },

        /**
         * Control the console log messages shown in the browser when using inline mode.
         * Can be `error`, `warning`, `info` or `none`.
         */
        clientLogLevel: "error"
    });

    server.listen(constants.webpackDevServer.port, "localhost", function (err) {
        if (err) {
            throw new Plugins.util.PluginError("webpack-dev-server", err);
        }

        // Server listening localhost:3100
        Plugins.util.log("[webpack-dev-server]", Options.webpack.config.output.publicPath + "webpack-dev-server/");
    });
});