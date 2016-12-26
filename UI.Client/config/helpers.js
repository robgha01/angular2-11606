var path = require("path");
var constants = require("./constants");
var _root = path.resolve(__dirname, "..");
var env = require("gulp-env");
var chalk = require("chalk");

module.exports = function() {
    var e = {};

    var _env = null;
    Object.defineProperty(e,
        "Env",
        {
            get: function () {
                if (process.env.NODE_ENV === undefined) {
                    return constants.environments.development;
                }
                else if (_env === null) {
                    return process.env.NODE_ENV;
                }

                return _env;
            }
        });

    var _isDevelopment = null;
    Object.defineProperty(e,
        "isDevelopment",
        {
            get: function () {
                if (_isDevelopment === null) {
                    return e.Env === constants.environments.development;
                }

                return _isDevelopment;
            }
        });

    var _isProduction = null;
    Object.defineProperty(e,
        "isProduction",
        {
            get: function () {
                if (_isProduction === null) {
                    return e.Env === constants.environments.production;
                }

                return _isProduction;
            }
        });

    var _isTest = null;
    Object.defineProperty(e,
        "isTest",
        {
            get: function () {
                if (_isTest === null) {
                    return e.Env === constants.environments.test;
                }

                return _isTest;
            }
        });

    e.root = function(args)
    {
        args = Array.prototype.slice.call(arguments, 0);
        return path.join.apply(path, [_root].concat(args));
    }

    e.isExternal = function (module) {
        var userRequest = module.userRequest;

        if (typeof userRequest !== "string") {
            return false;
        }

        return userRequest.indexOf("bower_components") >= 0 ||
               userRequest.indexOf("node_modules") >= 0 ||
               userRequest.indexOf("libraries") >= 0;
    }

    e.isNullOrUndefined = function(object) {
        return typeof object === "undefined" || object === null;
    }

    e.SetProdEnvironment = function() {
        env.set({ NODE_ENV: constants.environments.production });
    }

    e.SetDevEnvironment = function () {
        env.set({ NODE_ENV: constants.environments.development });
    }

    e.SetTestEnvironment = function () {
        env.set({ NODE_ENV: constants.environments.test });
    }

    e.GetWebpackConfig = function() {
        if (e.isProduction) {
            console.log(chalk.green("Building production"));
            return require("./webpack.prod.js");
        }

        console.log(chalk.green("Building development"));
        return require("./webpack.dev.js");
    }

    return e;
}();