import React from 'react';

const BookShelf = (props) => {
  return (
    <section>
      <div className="container">
        <div className="cuboid">
          <div className="cuboid__face cuboid__face--bottom"></div>
          <div className="cuboid__face cuboid__face--front"></div>
          <div className="cuboid__face cuboid__face--back"></div>
        </div>
      </div>
      <div className="books-container">{props.bookRow}</div>
      <div className="floor-thickness"></div>
    </section>
  );
};

export default BookShelf;
