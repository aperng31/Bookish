import React from 'react'

const BookShelf = (props) => {
  return (
    <section>
      <div class="container">
        <div class="cuboid">
          <div class="cuboid__face cuboid__face--bottom"></div>
          <div class="cuboid__face cuboid__face--front"></div>
          <div class="cuboid__face cuboid__face--back"></div>
        </div>
      </div>
      <div class="books-container">{props.bookRow}</div>
      <div class="floor-thickness"></div>
    </section>
  )
}

export default BookShelf
