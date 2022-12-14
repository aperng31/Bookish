import React, { useState } from 'react';
import BookInfoModal from './BookInfoModal';

function BookCover(props) {
  console.log('props in book cover', props);

  const [isOpen, setIsOpen] = useState(false);

  const handleImgClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="book-card-cover">
      <img
        onClick={handleImgClick}
        src="https://covers.openlibrary.org/b/id/12059372-M.jpg"
        alt="book cover"
      />
      {isOpen && <BookInfoModal setIsOpen={setIsOpen} props={props} />}
    </div>
  );
}

export default BookCover;
