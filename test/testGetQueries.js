import query1 from "./query1.graphql";
import { fetchAndMatch } from "./testUtil/queryAndVerify";
import "isomorphic-fetch";

test("Bool match true", async () => {
  await fetchAndMatch({ query: `query { getBooks{ title } }` });

  expect(1).toBe(1);
});
