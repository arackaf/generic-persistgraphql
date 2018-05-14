export const fetchAndMatch = async ({ query, variables, name, results }) =>
  fetch(
    `http://localhost:3000/graphql?query=${encodeURIComponent(query)}${
      variables ? `&variables=${encodeURIComponent(JSON.stringify(variables))}` : ""
    }`
  )
    .then(resp => resp.json())
    .then(resp => {
      expect(resp.data.getBooks).toEqual(results);
    });
