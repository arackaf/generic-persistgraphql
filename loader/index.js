const tag = require("graphql-tag");
const { print } = require("graphql");
const fs = require("fs");
const { getOptions } = require("loader-utils");

module.exports = function(src) {
  let options = getOptions(this);
  let queryLookup = eval("(" + fs.readFileSync(options.path) + ")");
  let queryAsString = print(tag(src));

  if (!(queryAsString in queryLookup)) {
    throw `Query ${queryAsString} not found`;
  }

  return "export default " + queryLookup[queryAsString];
};
