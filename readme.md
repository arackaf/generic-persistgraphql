# generic-persisted-queries

This project enables persisted graphql queries in a generic way, not tied to any particular GraphQL client, like Apollo. For an outstanding primer on what persisted queries are, check out this [blog post](https://dev-blog.apollodata.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5)

This project enables persisted graphql queries in a generic way, not tied to any particular GraphQL client, like Apollo. For an outstanding primer on what persisted queries are, check out this [blog post](https://dev-blog.apollodata.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5)

## Why is this project needed

The persistgraphql package is wonderfully simple, and effective. It allows you to automatically create a map of all valid graphql queries in your application; however, the accompanying tools tend to assume you're using a heavy graphql client like Apollo.

This project provides you with two simple pieces to accompany persistgraphql: a webpack loader which will take imports from .graphql files, and return you the actual id from the json mapping file; and a Node middleware that will lookup the graphql query id's that are sent over as queries, and replace them with the actual query. In addition to letting you reap the normal benefits of persisted queries, like saving bandwidth and preventing restricted query execution, you can do so without needing to pull in the graphql-tag package, or even the query text itself.

## How does it work

First, set up your webpack loader like this

```javascript
{
  test: /\.graphql$/,
  exclude: /node_modules/,
  use: {
    loader: "generic-persistgraphql/loader",
    options: {
      path: path.resolve(__dirname, "extracted_queries.json")
    }  
  }
}
```

then apply your Node middleware

```javascript
import { middleware } from "generic-persistgraphql";

// do this BEFORE your app.use("/graphql", ....) statement
middleware(app, { url: "/graphql", mappingFile: path.resolve(__dirname, "./react-redux/extracted_queries.json") });
```

Now import any queries or mutations you have in .graphql files, and then send that query over however you normally would.

```javascript
import getTags from "./getTags.graphql";

//...

graphqlClient.runQuery(getTags, { publicUserId: publicUserId }).then(({ data: { allTags } }) => {
  dispatch({ type: LOAD_TAGS_RESULTS, tags: allTags.Tags });
});
```

The Node middleware will look in `req.query.query` for GET requests, or `req.body.query` for POSTS, and see if the value sent over matches the query ID in the extracted queries json file. If so, it'll swap the real query in for you.
