import express from "express";
import expressGraphql from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";

import resolvers from "../graphQL/resolver";
import typeDefs from "../graphQL/schema";
import cors from "cors";

import middleware from "../../middleware/index";

export default {
  create() {
    const schema = makeExecutableSchema({ typeDefs, resolvers, initialValue: {} });

    const app = express();
    const root = {};

    app.use(cors());

    middleware(app, { url: "/graphql", mappingFile: path.resolve(__dirname, "../../extracted_queries.json") });
    app.use(
      "/graphql",
      expressGraphql({
        schema,
        graphiql: true,
        rootValue: root
      })
    );
    this.server = app.listen(3000);
  },
  dispose() {
    this.server.close();
  }
};
