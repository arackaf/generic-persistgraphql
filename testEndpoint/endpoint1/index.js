require = require("@std/esm")(module, { mode: "js", cjs: true });

//path relative to dist folder
module.exports = require("../testEndpoint/endpoint1/run.js");
