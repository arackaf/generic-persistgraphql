require = require("@std/esm")(module, { mode: "js", cjs: true });

const middleware = require("./middleware/index.js").default;

module.exports = {
  middleware
};
