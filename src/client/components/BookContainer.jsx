import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../redux/bookSlice';
import BookCard from './BookCard.jsx';
import BookCover from './BookCover.jsx';
import CreateBookButton from './CreateBookButton.jsx';
import CreateBookModal from './CreateBookModal.jsx';
import Header from './Header';
import '../styles/books.scss';
import Modal from 'react-modal';
import BookShelf from './BookShelf';
import '../stylesheets/bookcard.scss';
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

  //This method takes a flat array and turns it into an array of book row arrays
  //with each book row array containing upto 6 book cards.
  const bookData = useSelector((state) => state.book.bookData);
  const userData = useSelector((state) => state.user);
  const renderBooks = () => {
    const bookArray = [];

    let bookRow = [];
    for (let i = 0; i < bookData.length; i++) {
      const newBook = (
        <BookCover bookData={bookData[i]} key={i} userData={userData} />
      );
      // bookArray.push(newBook)
      bookRow.push(newBook);
      if (bookRow.length === 6) {
        bookArray.push(bookRow);
        bookRow = [];
      }
      if (i === bookData.length - 1 && bookRow.length) {
        bookArray.push(bookRow);
      }
    }
    return bookArray.map((bookRow, index) => {
      return <BookShelf bookRow={bookRow} key={index} />;
    });
  };
  return (
    <>
      <div id='book-container'>
        <Header userData={userData} bookData={bookData} />
        <CreateBookButton toggleCreateModal={openModal} />
        <CreateBookModal
          createBookModal={createBookModal}
          closeModal={closeModal}
          userData={userData}
          setBooks={(pl) => dispatch(setBooks(pl))}
        />
        {/* {bookArray} */}
      </div>
      {renderBooks()}
    </>
  );
}

export default BookContainer;
