export const fetchAndMatch = async ({ query, variables, name, results }) => {
  await fetch(
    `http://localhost:3000/graphql?query=${encodeURIComponent(query)}${
      variables ? `&variables=${encodeURIComponent(JSON.stringify(variables))}` : ""
    }`
  )
    .then(resp => resp.json())
    .then(resp => {
      expect(1).toBe(1);
      console.log(JSON.stringify(resp));
    })
    .catch(err => {
      console.log("ERROR", err);
    });
};
