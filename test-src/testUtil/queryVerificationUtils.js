import "isomorphic-fetch";
import { request } from "graphql-request";

export const fetchAndMatch = async ({ query, variables, name, results }) =>
  fetch(
    `http://localhost:3000/graphql?query=${encodeURIComponent(query)}${
      variables ? `&variables=${encodeURIComponent(JSON.stringify(variables))}` : ""
    }`
  )
    .then(resp => resp.json())
    .then(resp => {
      expect(resp.data).toEqual(results);
    });

export const requestAndMatch = async ({ query, variables, name, results }) =>
  request(`http://localhost:3000/graphql`, query, variables).then(resp => {
    expect(resp).toEqual(results);
  });
