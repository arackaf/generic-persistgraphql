import authorsQuery from "./graphQL/queries/authors.txt";
import authorsAndTitles from "./graphQL/queries/authorsThenTitles.txt";
import authorsOfBook from "./graphQL/queries/authorsOfBook.txt";
import authorsThenTitlesOfBook from "./graphQL/queries/authorsThenTitlesOfBook.txt";
import { fetchAndMatch } from "./testUtil/queryVerificationUtils";
import "isomorphic-fetch";

import Server3 from "./endpoint3";

beforeAll(() => {
  Server3.create();
});

afterAll(() => {
  Server3.dispose();
});

test("Basic GET", async () => {
  await fetchAndMatch({
    query: authorsQuery,
    results: { notFound: true }
  });
});

test("Basic GET - two queries", async () => {
  await fetchAndMatch({
    query: authorsAndTitles,
    results: { notFound: true }
  });
});

test("GET with variables", async () => {
  await fetchAndMatch({
    query: authorsOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: { notFound: true }
  });
});

test("GET with variables two queries", async () => {
  await fetchAndMatch({
    query: authorsThenTitlesOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: { notFound: true }
  });
});
