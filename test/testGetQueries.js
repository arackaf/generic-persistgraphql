import authorsQuery from "./authors.graphql";
import { fetchAndMatch } from "./testUtil/queryAndVerify";
import "isomorphic-fetch";

import Server1 from "./endpoint1";

beforeAll(() => {
  Server1.create();
});

afterAll(() => {
  Server1.dispose();
});

test("Bool match true", async () => {
  await fetchAndMatch({
    query: authorsQuery,
    results: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }]
  });

  expect(1).toBe(1);
});
