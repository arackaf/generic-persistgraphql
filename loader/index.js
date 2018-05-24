const tag = require("graphql-tag");
const { print } = require("graphql");
const fs = require("fs");
const { getOptions } = require("loader-utils");

const { addTypenameTransformer } = require("persistgraphql/lib/src/queryTransformers");

module.exports = function(src) {
  let options = getOptions(this);
  console.log("XXXXXXXXXXXXXXXXX CALLED WITH", src, options.add_typename);
  let queryLookup = eval("(" + fs.readFileSync(options.path) + ")");

  console.log("add_typename", options.add_typename);

  if (options.add_typename) {
    console.log("STARTING");
    console.log("A");
    console.log(tag(src));
    console.log("B");
    console.log(addTypenameTransformer(tag(src)));
  }

  let queryAsString = options.add_typename ? print(addTypenameTransformer(tag(src))) : print(tag(src));

  console.log("FINISHED", queryAsString);

  if (!(queryAsString in queryLookup)) {
    console.error(`Query ${queryAsString} not found`);
    throw `Query ${queryAsString} not found`;
  }

  console.log("export default " + queryLookup[queryAsString]);
  return "export default " + queryLookup[queryAsString];
};
