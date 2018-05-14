const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./test/*.js").reduce((obj, f) => ((obj[f.replace(/\.\/test\/(.*)\.js/, (s, name) => name)] = f), obj), {}),
  output: {
    filename: "[name].test.js",
    path: path.resolve(__dirname, "test/dist")
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: "./loader",
          options: {
            path: path.resolve(__dirname, "extracted_queries.json")
          }
        }
      }
    ],
    noParse: /testEndpoint|isomorphic-fetch/
  },
  resolve: {
    modules: [path.resolve("./node_modules")]
  },
  optimization: {
    minimize: false
  },
  mode: "production"
};
