module.exports = function () {
    var constants = {};

    constants.externalHost = "localhost";
    
    constants.environments = {
        production: "production",
        development: "development",
        test: "test"
    };

    constants.webpackDevServer = {
        port: 3100,
        host: "localhost"
    };

    constants.publicPath = "http://" + constants.webpackDevServer.host + ":" + constants.webpackDevServer.port + "/";

    constants.browserSync = {
        host: constants.externalHost,
        port: 3000,
        proxy: "http://" + constants.externalHost + "/"
    };
    
    constants.metadata = function() {
        var meta = {};

        meta.distPath = "./dist/";
        meta.srcPath = "./src/";
        meta.assetsPath = meta.srcPath + "assets/";
        meta.imagesPath = meta.assetsPath + "images/";
        meta.fontsPath = meta.assetsPath + "fonts/";
        
        /**
         * Defines the out path of assets. (only used when building production. in dev we serv files in the memory)
         */
        meta.assetsOutPath = meta.distPath + "static/assets/";

        /**
         * Defines the glob for assets that will be copied over to dist on production build.
         */
        meta.assetsGlob = [meta.fontsPath + "**/*", meta.imagesPath + "**/*"];

        return meta;
    }();

    return constants;
}();