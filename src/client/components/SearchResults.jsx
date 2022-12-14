import React, { useState } from 'react';
import Modal from './Modal';
import BookCard from './BookCard.jsx';

const SearchResults = (props) => {
  for (let i = 0; i < props.results.length; i++) {
    const books = [];
    const bookData = {
      author: books[i].author,
      title: books[i].title,
      pictureURL: books[i].pictureURL,
    };
    books.push(<BookCard bookData={bookData} />);
  }
  return <div className='SearchResults'>{books}</div>;
};

export default SearchResults;
