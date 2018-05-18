const allBooks = [
  { title: "The Selfish Gene", author: "Richard Dawkins" },
  { title: "The Blind Watchmaker", author: "Richard Dawkins" },
  { title: "The Blank Slate", author: "Steven Pinker" },
  { title: "Word Rules", author: "Steven Pinker" }
];

export default {
  Query: {
    getBooks(root, args) {
      if (args.title) {
        return allBooks.filter(book => book.title == args.title);
      }
      return allBooks;
    }
  }
};
