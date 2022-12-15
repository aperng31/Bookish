import React from 'react';

function BookCard(props) {
  console.log('props in BookCard', props);

  const [regularDisplayState, toggleDisplay] = React.useState('block');
  const [updateDisplayState, toggleUpdate] = React.useState('none');

  const [newUpdatedAuthor, newAuthor] = React.useState(
    props.props.props.bookData.author
  );
  const [newUpdatedTitle, newTitle] = React.useState(
    props.props.props.bookData.name
  );
  const [newUpdatedGenre, newGenre] = React.useState(
    props.props.props.bookData.genre_name
  );

  function toggleUpdateDisplay() {
    //render update input
    if (regularDisplayState === 'block') {
      toggleDisplay('none');
      toggleUpdate('block');
    } else {
      //if 'cancel' is clicked
      newAuthor(props.props.props.bookData.author); //reset default values to original bookData
      newTitle(props.props.props.bookData.name);
      newGenre(props.props.props.bookData.genre_name);
      toggleDisplay('block');
      toggleUpdate('none');
    }
  }

  function deleteBook() {
    // console.log(props);
    const body = {
      user_id: props.props.props.bookData.user_id,
      book_id: props.props.props.bookData.book_id,
    }; // user_id props.bookData.book_id
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    };
    // console.log(body);
    fetch('/books', options)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        props.setBooks(res);
        //close modal, redirect to home page to re-fetch data
      });
  }
  return (
    <div className="book-card book">
      <button className="closeBtn" onClick={() => props.props.setIsOpen(false)}>
        x
      </button>
      <h4>
        <span>
          Title:
          <span style={{ display: regularDisplayState }}>
            {props.props.props.bookData.title}
          </span>
          <input
            type="text"
            defaultValue={props.props.props.bookData.title}
            style={{ display: updateDisplayState }}
            onChange={(e) => newTitle(e.target.value)}
          ></input>
        </span>
      </h4>
      <h4>
        <span>
          Author:
          <span style={{ display: regularDisplayState }}>
            {props.props.props.bookData.author}
          </span>
          <input
            type="text"
            defaultValue={props.props.props.bookData.author}
            style={{ display: updateDisplayState }}
            onChange={(e) => newAuthor(e.target.value)}
          ></input>
        </span>
      </h4>
      {/* <button onClick={() => props.moreInfo(props.book_id) }>More Info</button> */}

      <button
        onClick={() => toggleUpdateDisplay()}
        style={{ display: updateDisplayState }}
      >
        Cancel
      </button>
      <button
        onClick={() => updateBookReq()}
        style={{ display: updateDisplayState }}
      >
        Update Book
      </button>

      <button onClick={() => deleteBook()}>Delete Book</button>
    </div>
  );
}

export default BookCard;
