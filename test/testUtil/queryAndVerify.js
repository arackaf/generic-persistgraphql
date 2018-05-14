export const fetchAndMatch = async ({ query, variables, name, results }) => {
  await fetch(
    `http://localhost:3000/graphql?query=${encodeURIComponent(query)}${
      variables ? `&variables=${encodeURIComponent(JSON.stringify(variables))}` : ""
    }`
  )
    .then(resp => resp.json())
    .then(resp => {
      if (!resp || !resp.data || !resp.data.getBooks) {
        fail("Bad response: " + JSON.stringify(resp));
      } else {
        expect(resp.data.getBooks).toEqual(results);
      }
    })
    .catch(err => {
      console.log("ERROR", err);
    });
};
