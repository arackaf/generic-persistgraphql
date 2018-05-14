export default `

type Book {
  title: String
  author: String
}

type Query {
  getBooks: [Book]
}

`;
