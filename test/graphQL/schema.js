export default `

type Book {
  title: String
  author: String
}

type Query {
  getBooks(title: String): [Book]
}

`;
