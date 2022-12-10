const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const entryController = require('./controllers/[PLACEHOLDER]');
const bookController = require('./controllers/[PLACEHOLDER]');

//handling static files from public I hope...
app.use(express.static(path.resolve(__dirname, '../public')));

//Do we want to use routers or no?

//USERS
app.get('/entries', entryController.findUser, (req, res) => {
  console.log('this is all entries');
  res.status(200).send(res.locals.something);
});

app.post('/entries', entryController.createUser, (req, res) => {
  console.log('this is createEntries');
  res.status(200).send(res.locals.allEntries);
});

//BOOKS
app.get('/books', bookController.getUserBooks, (req, res) => {
  console.log('this is get UserBooks');
  res.status(200).send(res.locals.allEntries);
});

app.post('/books', bookController.createBook, (req, res) => {
  console.log('this is createEntries');
  res.status(200).send(res.locals.allEntries);
});

app.delete('/books', bookController.deleteBook, (req, res) => {
  console.log('this is createEntries');
  res.status(200).send(res.locals.allEntries);
});

app.patch('/books', bookController.editBook, (req, res) => {
  console.log('this is createEntries');
  res.status(200).send(res.locals.allEntries);
});

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
