import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../redux/bookSlice';

function BookCard(props) {
  const [regularDisplayState, toggleDisplay] = React.useState('block');
  const [updateDisplayState, toggleUpdate] = React.useState('none');

  const [readBook, setReadBook] = React.useState(
    props.props.props.bookData.read
  );

  const dispatch = useDispatch();
  // console.log('props in bookcard ', props);

  const deleteBook = () => {
    props.props.setIsOpen(false);
    const body = {
      user_id: props.props.props.bookData.user_id,
      book_id: props.props.props.bookData.book_id,
    }; // user_id props.bookData.book_id
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    };
    console.log('body in delete fetch', body);
    fetch('/books', options)
      .then((res) => res.json())
      .then((data) => {
        // console.log('data in bookcard', data);
        dispatch(setBooks(data));
      });
  };

  const updateBook = () => {
    // console.log('updateBook clicked');
    const body = {
      user_id: props.props.props.bookData.user_id,
      book_id: props.props.props.bookData.book_id,
      read: readBook,
    };
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    };
    fetch('/books', options)
      .then((res) => res.json())
      .then((res) => {
        props.setBooks(res);
      });
  };

  return (
    <div className="book-card book">
      <button className="closeBtn" onClick={() => props.props.setIsOpen(false)}>
        x
      </button>
      <h4>
        <span>
          Title:
          <span style={{ display: regularDisplayState }}>
            {props.props.props.bookData.title}
          </span>
          <input
            type="text"
            defaultValue={props.props.props.bookData.title}
            style={{ display: updateDisplayState }}
            onChange={(e) => newTitle(e.target.value)}
          ></input>
        </span>
      </h4>
      <h4>
        <span>
          Author:
          <span style={{ display: regularDisplayState }}>
            {props.props.props.bookData.author}
          </span>
        </span>
      </h4>
      <button onClick={() => updateBook()}>Read</button>

      <button onClick={() => deleteBook()}>Delete Book</button>
    </div>
  );
}

export default BookCard;
