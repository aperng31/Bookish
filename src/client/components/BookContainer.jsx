import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBooks } from '../redux/bookSlice'
import BookCard from './BookCard.jsx'
import CreateBookButton from './CreateBookButton.jsx'
import CreateBookModal from './CreateBookModal.jsx'
import Header from './Header'
import '../styles/books.scss'
import Modal from 'react-modal'
import BookShelf from './BookShelf'
import '../stylesheets/bookcard.scss'
function BookContainer() {
  const [createBookModal, toggleCreate] = React.useState(false)
  const [loginModal, toggleLogin] = React.useState(true)

  function openModal() {
    toggleCreate(true)
  }
  function closeModal() {
    toggleCreate(false)
  }

  const dispatch = useDispatch()

  // const bookData = useSelector((state) => state.book.bookData)
  // const bookArray = []

  const bookData = useSelector(state => state.book.bookData);
  const userData = useSelector(state => state.user);
  const bookArray = [];

  for(let i = 0; i < bookData.length; i++) {
    const newBook = <BookCard bookData={ bookData[i] } userData={ userData }
    setBooks={(pl) => dispatch(setBooks(pl))}/>
    bookArray.push(newBook);
  }
  return (
    <div id='book-container'>
      <Header userData={ userData }/>
      <CreateBookButton toggleCreateModal={ openModal }/>
      <CreateBookModal createBookModal={ createBookModal } closeModal={ closeModal }
      userData={ userData } setBooks={(pl) => dispatch(setBooks(pl))}/>
      {bookArray}
    </div>
  )
}

export default BookContainer
