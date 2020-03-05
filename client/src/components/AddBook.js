import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { param }] = useMutation(addBookMutation);
  // console.log('param log', param());
  const [values, setValues] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addBook({
      variables: {
        name: values.name,
        genre: values.genre,
        authorId: values.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <div>
      <form id='add-book' onSubmit={handleSubmit}>
        <div className='field'>
          <label>Book name:</label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className='field'>
          <label>Genre:</label>
          <input
            type='text'
            name='genre'
            value={values.genre}
            onChange={handleChange}
          />
        </div>
        <div className='field'>
          <label>Author:</label>
          <select
            name='authorId'
            value={values.authorId}
            onChange={handleChange}
          >
            <option>Select Author</option>
            {loading && <option>Loading authors ...</option>}
            {error && <option>Error in loading authors...</option>}
            {data &&
              data.authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>
        <div className='field'>
          <button type='submit'>+</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
