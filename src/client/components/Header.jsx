import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getBooks, createBook, updateBook, deleteBook } from '../redux/userSlice'
import BookCard from './BookCard.jsx'
import '../styles/books.scss'

function Header(props) {
  const bookData = useSelector(state => state.book.bookData);
  const userData = useSelector(state => state.book.userData);
  const temp = 'helloworld';
  return (
    <header>
      <h3>Welcome <span>{ props.userData.name }</span></h3>
      
    </header>
  )
}

export default Header