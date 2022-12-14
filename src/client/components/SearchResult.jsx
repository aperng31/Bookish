import React, { useState } from 'react';
import Modal from './Modal';

const SearchResult = (props) => {
  function addBook(e) {
    e.preventDefault();
  }

  return (
    <div className='SearchResult'>
      <img src={props.bookData.pictureURL} />
      <p>{props.bookData.title}</p>
      <p>{props.bookData.author}</p>
      <button onClick={addBook}>Add</button>
    </div>
  );
};

export default SearchResult;
