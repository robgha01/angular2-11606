import "reflect-metadata";
import "core-js/es6";
import "core-js/es7/reflect";
require("zone.js/dist/zone");

// Development
if (ENV === "development") {
    Error["stackTraceLimit"] = Infinity;
    require("zone.js/dist/long-stack-trace-zone");
}
