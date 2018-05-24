import express from "express";
import expressGraphql from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";

import resolvers from "../graphQL/resolver";
import typeDefs from "../graphQL/schema";
import cors from "cors";
import bodyParser from "body-parser";

import middleware from "../../middleware/index";

export default {
  create() {
    const schema = makeExecutableSchema({ typeDefs, resolvers, initialValue: {} });

    const app = express();
    const root = {};

    app.use(cors());

    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
      })
    );

    middleware(app, {
      url: "/graphql",
      mappingFile: path.resolve(__dirname, "../../extracted_queries_empty.json"),
      onQueryNotFound: (req, resp, next) => {
        return resp.send({ data: { notFound: true } });
      }
    });
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
