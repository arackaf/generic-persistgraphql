import authorsQuery from "./graphQL-files/typeNameQueries/authors.graphql";
import authorsAndTitles from "./graphQL-files/typeNameQueries/authorsThenTitles.graphql";
import authorsOfBook from "./graphQL-files/typeNameQueries/authorsOfBook.graphql";
import authorsThenTitlesOfBook from "./graphQL-files/typeNameQueries/authorsThenTitlesOfBook.graphql";
import { fetchAndMatch } from "./testUtil/queryVerificationUtils";
import "isomorphic-fetch";

import Server4 from "./endpoint4";
//
beforeAll(() => {
  Server4.create();
});

afterAll(() => {
  Server4.dispose();
});

test("Basic GET", async () => {
  await fetchAndMatch({
    query: authorsQuery,
    results: {
      getBooks: [
        { __typename: "Book", author: "Richard Dawkins" },
        { __typename: "Book", author: "Richard Dawkins" },
        { __typename: "Book", author: "Steven Pinker" },
        { __typename: "Book", author: "Steven Pinker" }
      ]
    }
  });
});

test("Basic GET - two queries", async () => {
  await fetchAndMatch({
    query: authorsAndTitles,
    results: {
      authors: [
        { __typename: "Book", author: "Richard Dawkins" },
        { __typename: "Book", author: "Richard Dawkins" },
        { __typename: "Book", author: "Steven Pinker" },
        { __typename: "Book", author: "Steven Pinker" }
      ],
      titles: [
        { __typename: "Book", title: "The Selfish Gene" },
        { __typename: "Book", title: "The Blind Watchmaker" },
        { __typename: "Book", title: "The Blank Slate" },
        { __typename: "Book", title: "Word Rules" }
      ]
    }
  });
});

test("GET with variables", async () => {
  await fetchAndMatch({
    query: authorsOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: { getBooks: [{ __typename: "Book", author: "Richard Dawkins" }] }
  });
});

test("GET with variables two queries", async () => {
  await fetchAndMatch({
    query: authorsThenTitlesOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: {
      authors: [{ __typename: "Book", author: "Richard Dawkins" }],
      titles: [{ __typename: "Book", title: "The Selfish Gene" }]
    }
  });
});
