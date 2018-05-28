# generic-persisted-queries

This project enables persisted graphql queries in a generic way, not tied to any particular GraphQL client, like Apollo. For an outstanding primer on what persisted queries are, check out this [blog post](https://dev-blog.apollodata.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5)

## Installation

`npm i generic-persistgraphql --save`

## Why is this project needed

The persistgraphql package is wonderfully simple, and effective. It allows you to automatically create a map of all valid graphql queries in your application; however, the accompanying tools tend to assume you're using a particular graphql client like Apollo.

This project provides you with two simple pieces to accompany persistgraphql: a webpack loader which will take imports from `.graphql` files, and return you the actual id from the json mapping file; and a Node middleware that will take the graphql query id's that are sent over, and replace them with the actual query from that same json map. In addition to letting you reap the normal benefits of persisted queries, like saving bandwidth and preventing unrestricted query execution, you can do so without needing to pull in the graphql-tag package, _or even the query text itself._

## How does it work

First, run `persistgraphql` however you need. For details on how to do so, check out [the docs](https://github.com/apollographql/persistgraphql)

---

Then set up the webpack loader

```javascript
{
  test: /\.graphql$/,
  exclude: /node_modules/,
  use: {
    loader: "generic-persistgraphql/loader",
    options: {
      path: path.resolve(__dirname, "extracted_queries.json"),
      add_typename: true
    }  
  }
}
```

### Loader options

`path` is the path to the json file persistgraphql created for you.

`add_typename` is the same as the `add_typename` option in persistgraphql. If you set it to true there, be sure to set it to true here. Conversely, if you don't set it there, don't set it here.

---

Then apply the Node middleware

```javascript
import { middleware } from "generic-persistgraphql";

// do this BEFORE your app.use("/graphql", ....) statement
middleware(app, { url: "/graphql", mappingFile: path.resolve(__dirname, "./react-redux/extracted_queries.json") });
```

### Middleware options

`url`: Your graphql url.

`mappingFile`: Path to the json file persistgraphql created for you.

`onQueryNotFound`: If you'd like to prevent unrestricted query execution, provide a function here which will be called whenever a query or mutation comes over the wire which is not the key to an entry in the json file. It will be called with the Express `request`, `response`, and `next` values. For example

```javascript
middleware(app, {
  url: "/graphql",
  mappingFile: path.resolve(__dirname, "./extracted_queries.json"),
  onQueryNotFound: (req, resp, next) => {
    return resp.send({ data: { notFound: true } });
  }
});
```

---

Now import any queries or mutations you have in .graphql files, and use them as you normally would.

```javascript
import getTags from "./getTags.graphql";

graphqlClient.runQuery(getTags, { publicUserId: publicUserId }).then(({ data: { allTags } }) => {
  dispatch({ type: LOAD_TAGS_RESULTS, tags: allTags.Tags });
});
```

The Node middleware will look in `req.query.query` for GET requests, or `req.body.query` for POSTS, and see if the value sent over matches an ID in the extracted queries json file. If so, it'll swap the real query in for you. If it's not found, it'll either just send the value along to the normal GraphQL middleware, or call `onQueryNotFound` if you provided a value for it.
