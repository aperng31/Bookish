import React from 'react';
import '../styles/books.scss';
import Modal from 'react-modal';

function CreateBookModal(props) {
  let subtitle;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  const customStyles = {
    content: {
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
    const url = userInput.replace(' ', '+');
    // console.log(JSON.stringify({ inputPlus }));
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ url }),
    })
      // .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <Modal
      isOpen={props.createBookModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Add Book"
      // createBook={ createBook }
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <div>Add Book</div>
      <form>
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={(e) => newTitle(e.target.value)}
        />
        <button type="button" onClick={bookSearch}>
          Search
        </button>
        {/* <input
          type='text'
          placeholder='Author'
          onChange={(e) => newAuthor(e.target.value)}
        /> */}
        <div className="">
          <select onChange={(e) => newGenre(e.target.value)}>
            <option value="none" selected disabled hidden>
              Select an Genre
            </option>
            <option value="thriller">Thriller</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="contemporary">Contemporary</option>
          </select>
        </div>
      </form>
      <button>Add Book</button>
      <button onClick={props.closeModal}>Cancel</button>
    </Modal>
  );
}

export default CreateBookModal;
