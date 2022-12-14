import React, { useState } from 'react';
import BookCard from './BookCard';
import '../stylesheets/bookModal.scss';

const BookInfoModal = (props) => {
  console.log('props in book info modal', props);
  return (
    <div className="darkBG">
      <div className="centered">
        <div className="bookModal">
          <BookCard props={props} />
        </div>
      </div>
    </div>
  );
};
export default BookInfoModal;
