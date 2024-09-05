import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_BOOKS } from '../graphql/queries';

const BookList = () => {
  const { loading, error, data } = useQuery(QUERY_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {data.books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
