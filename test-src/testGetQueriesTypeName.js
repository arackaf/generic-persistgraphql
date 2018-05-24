import authorsQuery from "./graphQL-files/queriesWithTypeNames/authors.graphql";
import authorsAndTitles from "./graphQL-files/queriesWithTypeNames/authorsThenTitles.graphql";
import authorsOfBook from "./graphQL-files/queriesWithTypeNames/authorsOfBook.graphql";
import authorsThenTitlesOfBook from "./graphQL-files/queriesWithTypeNames/authorsThenTitlesOfBook.graphql";
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
    results: { getBooks: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }] }
  });
});

test("Basic GET - two queries", async () => {
  await fetchAndMatch({
    query: authorsAndTitles,
    results: {
      authors: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }],
      titles: [{ title: "The Selfish Gene" }, { title: "The Blind Watchmaker" }, { title: "The Blank Slate" }, { title: "Word Rules" }]
    }
  });
});

test("GET with variables", async () => {
  await fetchAndMatch({
    query: authorsOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: { getBooks: [{ author: "Richard Dawkins" }] }
  });
});

test("GET with variables two queries", async () => {
  await fetchAndMatch({
    query: authorsThenTitlesOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: {
      authors: [{ author: "Richard Dawkins" }],
      titles: [{ title: "The Selfish Gene" }]
    }
  });
});
