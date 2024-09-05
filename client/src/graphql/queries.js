import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      title
      authors
      description
      image
      link
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      _id
      title
      authors
      description
      image
      link
    }
  }
`;

export const QUERY_BOOKS = gql`
  query GetBooks {
    books {
      _id
      title
      author
      description
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
        author
        description
      }
    }
  }
`;

