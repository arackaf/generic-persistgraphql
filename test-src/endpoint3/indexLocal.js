require = require("@std/esm")(module, { mode: "js", cjs: true });

//This is how Jest wants the path for some reason
const mod = require("./run.js").default;
mod.create();
