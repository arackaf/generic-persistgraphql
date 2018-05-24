const tag = require("graphql-tag");
const { print } = require("graphql");
const fs = require("fs");
const { getOptions } = require("loader-utils");

const { addTypenameTransformer } = require("persistgraphql/lib/src/queryTransformers");

module.exports = function(src) {
  let options = getOptions(this);
  let queryLookup = eval("(" + fs.readFileSync(options.path) + ")");
  let queryAsString = options.add_typename ? print(addTypenameTransformer(tag(src))) : print(tag(src));

  if (!(queryAsString in queryLookup)) {
    console.error(`Query ${queryAsString} not found`);
    throw `Query ${queryAsString} not found`;
  }

  return "export default " + queryLookup[queryAsString];
};
