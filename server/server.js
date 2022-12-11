const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const entryController = require('./server/controllers/[PLACEHOLDER]');
const bookController = require('./server/controllers/[PLACEHOLDER]');

//handling static files from public I hope...
app.use(express.static(path.resolve(__dirname, '../public')));

//Do we want to use routers or no?

//USERS
app.get(
  '/entries',
  entryController.findUser,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this user entries');
    res.status(200).send(res.locals.userBooks);
  }
);

app.post('/entries', entryController.createUser, (req, res) => {
  console.log('this is createEntries');
  //maybe just send them somewhere instead
  res.status(200).send(res.locals.allEntries);
});

//BOOKS
//we don't need router for this because we only ever get book on login or creating new entry
// app.get('/books', bookController.getUserBooks, (req, res) => {
//   console.log('this is get UserBooks');
//   res.status(200).send(res.locals.userBooks);
// });

//this should try to find a book, if not found: create an entry, and return the user's list of books
//if found, skip to create catalog
app.post(
  '/books',
  bookController.findBook,
  bookController.findGenre,
  bookController.createBook,
  bookController.createCatalogEntry,
  bookController.getUserBooks,
  (req, res) => {
    console.log('this is createEntries');
    res.status(202).send(res.locals.allEntries);
  }
);

//NEED TO WORK ON THESE SOON
// app.delete('/books', bookController.deleteBook, (req, res) => {
//   console.log('this is createEntries');
//   res.status(200).send(res.locals.allEntries);
// });

// app.patch('/books', bookController.editBook, (req, res) => {
//   console.log('this is createEntries');
//   res.status(200).send(res.locals.allEntries);
// });

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
