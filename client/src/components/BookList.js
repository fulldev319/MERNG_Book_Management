import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error in loading books... :(</p>;
  console.log(data);

  return (
    <div>
      <ul id='book-list'>
        {data &&
          data.books.map(book => (
            <li key={book.id} onClick={() => setSelected(book.id)}>
              {book.name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
