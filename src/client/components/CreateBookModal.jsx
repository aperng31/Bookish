import React from 'react';
import '../styles/books.scss';
import Modal from 'react-modal';
import SearchResult from './SearchResult';

function CreateBookModal(props) {
  let subtitle;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  const customStyles = {
    content: {
      background: 'rgba(22, 22, 23, 0.7)',
      padding: '100px',
      // display: 'flex',
      // flex_direction: 'column',
      borderRadius: '1rem',
      fontFamily: '"Courier New", Courier, monospace',
      color: 'white',
      fontSize: '25px',
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const [author, newAuthor] = React.useState('');
  const [title, newTitle] = React.useState('');
  const [genre, newGenre] = React.useState('');
  const [books, setBooks] = React.useState([]);

  // function createBookReq() {
  //   // const body = { author, name: title, genre_name: genre, user_id: props.userData.user_id };
  //   const body = { author, name: title, genre_name: genre };
  //   // console.log(body);

  //   const options = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'Application/JSON' },
  //     body: JSON.stringify(body),
  //   };
  //   fetch('/books', options)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log('createbook res', res);
  //       props.setBooks(res);
  //       props.closeModal();
  //       //close modal, redirect to home page (which re-fetchs?)
  //     })
  //     .catch((err) => {});
  // }
  function bookSearch(e) {
    e.preventDefault;
    const userInput = document.querySelector('#title').value;
    const url = userInput.replaceAll(' ', '+');
    console.log(JSON.stringify({ url }));
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const bookSearchResult = data.map((books, index) => {
          const bookData = {
            author: data[index].author,
            title: data[index].title,
            pictureURL: data[index].pictureURL,
          };
          if (index < 5) {
            return (
              <SearchResult
                closeModal={props.closeModal}
                setBooks={props.setBooks}
                bookData={bookData}
                key={index}
              />
            );
          }
        });
        setBooks(bookSearchResult);
      });
  }

  return (
    <Modal
      isOpen={props.createBookModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel='Add Book'
      // createBook={ createBook }
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <label>Add Book</label>
      <form>
        <input
          type='text'
          id='title'
          placeholder='Title'
          onChange={(e) => newTitle(e.target.value)}
        />
        <div id='wrapper'>
          <div className='results'>{books}</div>
        </div>
        {/* <input
          type='text'
          placeholder='Author'
          onChange={(e) => newAuthor(e.target.value)}
        /> */}
        {/* <div className=''> */}
        {/* <select onChange={(e) => newGenre(e.target.value)}>
            <option value='none' selected disabled hidden>
              Select an Genre
            </option>
            <option value='thriller'>Thriller</option>
            <option value='fantasy'>Fantasy</option>
            <option value='horror'>Horror</option>
            <option value='mystery'>Mystery</option>
            <option value='contemporary'>Contemporary</option>
          </select> */}
        {/* </div> */}
      </form>
      <button onClick={bookSearch}>Search</button>
      <button onClick={props.closeModal}>Cancel</button>
    </Modal>
  );
}

export default CreateBookModal;
