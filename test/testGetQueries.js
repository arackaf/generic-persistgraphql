import query1 from "./query1.graphql";
import { fetchAndMatch } from "./testUtil/queryAndVerify";
import "isomorphic-fetch";

import Server1 from "../testEndpoint/endpoint1";

beforeAll(() => {
  Server1.create();
});

afterAll(() => {
  Server1.dispose();
});

test("Bool match true", async () => {
  await fetchAndMatch({ query: `query { getBooks{ title } }` });

  expect(1).toBe(1);
});
