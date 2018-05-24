import authorsQuery from "./graphQL/queries/authors.txt";
import authorsAndTitles from "./graphQL/queries/authorsThenTitles.txt";
import authorsOfBook from "./graphQL/queries/authorsOfBook.txt";
import authorsThenTitlesOfBook from "./graphQL/queries/authorsThenTitlesOfBook.txt";
import { fetchAndMatch } from "./testUtil/queryVerificationUtils";
import "isomorphic-fetch";

import Server2 from "./endpoint2";

beforeAll(() => {
  Server2.create();
});

afterAll(() => {
  Server2.dispose();
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
