import express from "express";
import expressGraphql from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "../graphQL/resolver";
import typeDefs from "../graphQL/schema";
import cors from "cors";

export default {
  create() {
    const schema = makeExecutableSchema({ typeDefs, resolvers, initialValue: {} });

    const app = express();
    const root = {};

    app.use(cors());
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
