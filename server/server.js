const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');

//handling static files from public I hope...
app.use(express.static(path.resolve(__dirname, '../public')));

//Do we want to use routers or no?

//USERS
//input (req.body) --> username and passsword
app.use(cors());

app.post(
  '/login',
  userController.findUser,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this user entries');
    res
      .status(200)
      .send({ userBooks: res.locals.userBooks, user: res.locals.user });
  }
);

//input:  req.body: name, username, password
app.post(
  '/signup',
  userController.createUser,
  userController.getUser,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this is createEntries');
    //maybe just send them somewhere instead
    res
      .status(200)
      .send({ userBooks: res.locals.userBooks, user: res.locals.user });
  }
);

//BOOKS
//we don't need router for this because we only ever get book on login or creating new entry
//we also need on delete AND EDIT WHICH I FORGOT ABOUT
// app.get('/books', bookController.getUserBooks, (req, res) => {
//   console.log('this is get UserBooks');
//   res.status(200).send(res.locals.userBooks);
// });

//this should try to find a book, if not found: create an entry, and return the user's list of books
//if found, skip to create catalog

app.get('/books', (req, res) => {
  console.log('this is createEntries');
  res.status(202).send('store data in res.locals and end back to frontend');
});

app.post('/books', bookController.findBook, (req, res) => {
  res.status(200).json(res.locals.data);
});

// original post request
// app.post(
//   '/books',
//   bookController.findBook,
//   bookController.findGenre,
//   bookController.createBook,
//   bookController.findBook,
//   bookController.createCatalogEntry,
//   bookController.getUserBooks,
//   (req, res) => {
//     console.log('this is createEntries');
//     res.status(202).send(res.locals.userBooks);
//   }
// );

//NEED TO WORK ON THESE SOON
app.delete(
  '/books',
  bookController.deleteBook,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this is delete');
    res.status(200).send(res.locals.userBooks);
  }
);

app.patch(
  '/books',
  bookController.findGenre,
  bookController.editBook,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this is edit');
    res.status(200).send(res.locals.userBooks);
  }
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.use((req, res, next) => {
  console.error('Server.js 404');
  return res.sendStatus(404);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
