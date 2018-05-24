require = require("@std/esm")(module, { mode: "js", cjs: true });

//This is how Jest wants the path for some reason
module.exports = require("./test-src/endpoint3/run.js");
