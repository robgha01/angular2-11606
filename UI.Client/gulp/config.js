// ToDo: Move this to ../config in there respective file ex helpers, constants etc.
function GetGlobPath(withChildFolder) {
    if (withChildFolder === undefined || withChildFolder === "") {
        return this.sourcePath + this.glob;
    }
    return this.sourcePath + withChildFolder + "/" + this.glob;
}

var DistPath = "./dist/";

var Exports = module.exports = function() {
    var config = {};
    
    // The build output path.
    config.distPath = DistPath;

    config.webUiPath = "../UI/static/";

    config.pattern = ["gulp/tasks/**/*.js"];

    config.typescript = {
        sourcePath: "./src/typescript/",
        outPath: DistPath,
        outPathDefinitions: DistPath + "definitions/"
    }

    config.sass = {
        sourcePath: "./src/sass/",
        glob: ["**/*.scss"],
        outPath: DistPath
    }

    config.webpack = {
        requiredInstance: require("webpack")
    }

    var _config = null;
    Object.defineProperty(config.webpack,
        "config",
        {
            get: function() {
                if (_config === null) {
                    return require("../webpack.config.js");
                }
                return _config;
            },
            set: function(value) {
                _config = value;
            }
        });

    return config;
}();
Exports.typescript.getGlobPath = GetGlobPath;
Exports.sass.getGlobPath = GetGlobPath;