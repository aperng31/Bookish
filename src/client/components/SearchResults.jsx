import React, { useState } from 'react';
import Modal from './Modal';
import BookCard from './BookCard.jsx';

const SearchResults = (props) => {
  for (let i = 0; i < props.books.length; i++) {
    const books = [];
    const bookData = {
      author: props.books[i].author,
      title: props.books[i].title,
      pictureURL: props.books[i].pictureURL,
    };
    books.push(<BookCard bookData={bookData} />);
  }
  return (
    <Modal>
      <div className='SearchResults'>{books}</div>
    </Modal>
  );
};

export default SearchResults;
