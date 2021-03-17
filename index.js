require = require("esm")(module, { mode: "auto", cjs: true });

const middleware = require("./middleware/index.js").default;

module.exports = {
  middleware
};
