import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setBooks } from '../redux/bookSlice'
import BookCard from './BookCard.jsx'
import CreateBookButton from './CreateBookButton.jsx'
import CreateBookModal from './CreateBookModal.jsx'
import Header from './Header';
import '../styles/books.scss'
import Modal from 'react-modal'

function BookContainer() {

  const [createBookModal, toggleCreate] = React.useState(false);
  const [loginModal, toggleLogin] = React.useState(true);

  function openModal() {
    toggleCreate(true);
  }
  function closeModal() {
    toggleCreate(false);
  }

  const dispatch = useDispatch();

  const bookData = useSelector(state => state.book.bookData);
  const user_id = useSelector(state => state.user.user_id);

  const bookArray = [];

  for(let i = 0; i < bookData.length; i++) {
    const newBook = <BookCard bookData={ bookData[i] } user_id={ user_id } />
    bookArray.push(newBook);
  }

  return (
    <div id='book-container'>
      <Header />
      <CreateBookButton toggleCreateModal={ openModal }/>
      <CreateBookModal createBookModal={ createBookModal } closeModal={ closeModal } user_id={ user_id }/>
      {bookArray}
    </div>
  )
}

export default BookContainer