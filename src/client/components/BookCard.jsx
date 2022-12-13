import React from 'react'

function BookCard(props) {
  // console.log('props', props);

  const [regularDisplayState, toggleDisplay] = React.useState('block')
  const [updateDisplayState, toggleUpdate] = React.useState('none')

  const [newUpdatedAuthor, newAuthor] = React.useState('')
  const [newUpdatedTitle, newTitle] = React.useState('')
  const [newUpdatedGenre, newGenre] = React.useState('')

  function toggleUpdateDisplay() {
    //render update input
    // console.log(regularDisplayState)
    if (regularDisplayState === 'block') {
      toggleDisplay('none')
      toggleUpdate('block')
    } else {
      //if 'cancel' is clicked
      newAuthor(props.bookData.author) //reset default values to original bookData
      newTitle(props.bookData.name)
      newGenre(props.bookData.genre)
      toggleDisplay('block')
      toggleUpdate('none')
    }
  }

  function updateBookReq() {
    console.log(props.bookData._id)
    const body = {
      book_id: props.bookData._id,
      name: newUpdatedTitle, 
      author: newUpdatedAuthor, 
      genre_name: newUpdatedGenre, 
      user_id: props.userData.user_id
    }
    // const body = {
    //   author: newUpdatedAuthor,
    //   title: newUpdatedTitle,
    //   genre_string: newUpdatedGenre,
    //   book_id: props.bookData.book_id,
    // }
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    }
    console.log(body)
    fetch('/books', options)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      props.setBooks(res);
      toggleUpdateDisplay() //on successful update, re-update Redux and set to non-update display
    })
  }

  function deleteBook() {
    console.log(props);
    const body = { user_id: props.userData.user_id, book_id: props.bookData._id }; // user_id props.bookData.book_id
    const options = { method: 'DELETE', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) };
    console.log(body);
    fetch('/books', options)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      props.setBooks(res)
      //close modal, redirect to home page to re-fetch data
    })
  }
  return (
    <div className="book-card book">
      <h4>
        <span>
          Title:
          <span style={{ display: regularDisplayState }}>
            {props.bookData.name}
          </span>
          <input
            type="text"
            defaultValue={props.bookData.name}
            style={{ display: updateDisplayState }}
            onChange={(e) => newTitle(e.target.value)}
          ></input>
        </span>
      </h4>
      <h4>
        <span>
          Author:
          <span style={{ display: regularDisplayState }}>
            {props.bookData.author}
          </span>
          <input
            type="text"
            defaultValue={props.bookData.author}
            style={{ display: updateDisplayState }}
            onChange={(e) => newAuthor(e.target.value)}
          ></input>
        </span>
      </h4>
      <h4>
        <span>
          Genre:
          <span style={{ display: regularDisplayState }}>
            {props.bookData.genre_name}
          </span>
          <div className="" style={{ display: updateDisplayState }}>
            <select onChange={(e) => newGenre(e.target.value)}>
              <option value="fantasy">Thriller</option>
              <option value="mystery">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="contemporary">Contemporary</option>
            </select>
          </div>
        </span>
      </h4>
      {/* <button onClick={() => props.moreInfo(props.book_id) }>More Info</button> */}

      <button
        onClick={() => toggleUpdateDisplay()}
        style={{ display: regularDisplayState }}
      >
        Edit Book
      </button>

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
  )
}

export default BookCard
