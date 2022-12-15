import React from 'react';
import Icon from '@mdi/react';
import addIcon from '../icons/add.png';
import { mdiBookPlusOutline } from '@mdi/js';
// import { useSelector, useDispatch } from 'react-redux'
// import { getBooks, createBook, updateBook, deleteBook } from '../redux/counterSlice'

function CreateBookButton(props) {
  // console.log('props', props.toggleCreateModal);
  return (
    <div id="add-book">
      {/* <img src={addIcon} onClick={props.toggleCreateModal}></img> */}
      <div className="icon">
        <Icon
          path={mdiBookPlusOutline}
          size={1}
          color="black"
          onClick={props.toggleCreateModal}
        />
      </div>
    </div>
  );
}

export default CreateBookButton;
