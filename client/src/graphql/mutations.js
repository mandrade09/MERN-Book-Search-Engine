import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation SaveBook($title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
    saveBook(title: $title, authors: $authors, description: $description, image: $image, link: $link) {
      _id
      title
      authors
      description
      image
      link
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      _id
    }
  }
`;
