import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId }
  });
  if (loading) return <p>Loading book detail...</p>;
  if (error) return <p>Error in loading book detail...</p>;

  return (
    <div id='book-details'>
      {data.book && (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {data.book.author.books.map(book => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      )}
      {!data.book && <div>No book selected...</div>}
    </div>
  );
}

export default BookDetails;
