const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./test-src/*.js").reduce((obj, f) => ((obj[f.replace(/\.\/test-src\/(.*)\.js/, (s, name) => name)] = f), obj), {}),
  output: {
    filename: "[name].test.js",
    path: path.resolve(__dirname, "test")
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        include: path.resolve(__dirname, "test-src/graphQL-files/queries"),
        exclude: /node_modules/,
        use: {
          loader: "./loader",
          options: {
            path: path.resolve(__dirname, "extracted_queries.json")
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        include: path.resolve(__dirname, "test-src/graphQL-files/typeNameQueries"),
        exclude: /node_modules/,
        use: {
          loader: "./loader",
          options: {
            path: path.resolve(__dirname, "extracted_queries_typename.json"),
            add_typename: true
          }
        }
      },
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ],
    noParse: /endpoint|isomorphic-fetch/
  },
  resolve: {
    modules: [path.resolve("./node_modules")]
  },
  optimization: {
    minimize: false
  },
  mode: "production"
};
