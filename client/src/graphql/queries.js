import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
  query getBooks {
    books {
      _id
      title
      authors
      description
      image
    }
  }
`;

export const QUERY_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
      }
    }
  }
`;
