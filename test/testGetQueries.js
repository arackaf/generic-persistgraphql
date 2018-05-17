import authorsQuery from "./authors.graphql";
import authorsOfBook from "./authorsOfBook.graphql";
import { fetchAndMatch } from "./testUtil/queryAndVerify";
import "isomorphic-fetch";

import Server1 from "./endpoint1";

beforeAll(() => {
  Server1.create();
});

afterAll(() => {
  Server1.dispose();
});

test("Basic GET", async () => {
  await fetchAndMatch({
    query: authorsQuery,
    results: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }]
  });
});

test("GET with variables", async () => {
  await fetchAndMatch({
    query: authorsOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: [{ author: "Richard Dawkins" }]
  });
});
