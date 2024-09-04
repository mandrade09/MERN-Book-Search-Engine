const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    title: String
    authors: [String] 
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Query {
    books: [Book]
    me: User
  }

  type Mutation {
    saveBook(title: String!, authors: [String]!, description: String, image: String, link: String): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;


