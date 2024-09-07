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

 type Auth {
    token: ID!
    user: User
  }

  type Query {
    books: [Book]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
    saveBook(title: String!, authors: [String]!, description: String, image: String, link: String): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;


