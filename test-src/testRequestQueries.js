import authorsQuery from "./graphQL/queries/authors.graphql";
import authorsAndTitles from "./graphQL/queries/authorsThenTitles.graphql";
import authorsOfBook from "./graphQL/queries/authorsOfBook.graphql";
import authorsThenTitlesOfBook from "./graphQL/queries/authorsThenTitlesOfBook.graphql";
import { requestAndMatch } from "./testUtil/queryVerificationUtils";

import Server1 from "./endpoint1";

beforeAll(() => {
  Server1.create();
});

afterAll(() => {
  Server1.dispose();
});

test("Basic GET", async () => {
  await requestAndMatch({
    query: authorsQuery,
    results: { getBooks: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }] }
  });
});

test("Basic GET - two queries", async () => {
  await requestAndMatch({
    query: authorsAndTitles,
    results: {
      authors: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }],
      titles: [{ title: "The Selfish Gene" }, { title: "The Blind Watchmaker" }, { title: "The Blank Slate" }, { title: "Word Rules" }]
    }
  });
});

test("GET with variables", async () => {
  await requestAndMatch({
    query: authorsOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: { getBooks: [{ author: "Richard Dawkins" }] }
  });
});

test("GET with variables two queries", async () => {
  await requestAndMatch({
    query: authorsThenTitlesOfBook,
    variables: { titleVar: "The Selfish Gene" },
    results: {
      authors: [{ author: "Richard Dawkins" }],
      titles: [{ title: "The Selfish Gene" }]
    }
  });
});
