//NEED MODEL
const db = require('../models/scratch_model.js');
// const nodefetch = require('node-fetch');

const bookController = {};

bookController.getAllBooks = (req, res, next) => {
  const mySQL = 'SELECT b._id AS ID, b_name as Title/name from books';
  db.query(mySQL).then((data) => {
    res.locals.allBooks = data.rows;
    return next();
  });
};

//query to get a list of the users books
//output:[{_id, name, author, genre_id, genre_name}...]
bookController.getUserBooks = (req, res, next) => {
  // write code here
  //Should have this for either when someone logs in or when someone enters a new entry
  console.log('we are in getUserBooks: ', res.locals.user._id);
  const id = [res.locals.user._id];

  //this should get all the entries of books where c.book_id = b._ID and u._id = c.user_ID when u._id = entry
  const mySQL =
    //this should get all the books without genre
    'SELECT b.* FROM books b INNER JOIN catalog c on c.book_id = b._id INNER JOIN users u on u._id = c.user_id WHERE u._id = $1';
  //This might work to get the genre as well as the book id?
  const mySQL2 =
    // 'SELECT b.*, g.genre AS genre_name FROM books b INNER JOIN catalog c ON c.book_id = b._id INNER JOIN genre g ON g._id = b.genre INNER JOIN users u ON u._id = c.user_id WHERE u._id = $1';
    'SELECT b.*, g.genre AS genre_name FROM books b INNER JOIN genre g ON b.genre = g._id INNER JOIN catalog c ON c.book_id = b._id WHERE c.user_id = $1;';
  // const diffSQL = 'SELECT p.name AS Character, s.name FROM public.people p LEFT OUTER JOIN public.species s ON p.species_id = s._id';
  db.query(mySQL2, id)
    .then((data) => {
      // console.log('query successful, here is data: ', data.rows);
      res.locals.userBooks = data.rows ? data.rows : [];
      return next();
    })
    //this will be front end work if there is nothing found, just have an empty array
    .catch((err) => {
      return next({
        log: `Error in getUserBooks: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

bookController.addBook = (req, res, next) => {
  
}

bookController.findBook = (req, res, next) => {
  console.log('req.body.url: ', req.body.url);
  // req.body.url ==== "the+lord+of+the+rings"
  // fetch url = "http://openlibrary.org/search.json?q="
  // add the string from req.body into our url for the fetch request

  const urlString = `http://openlibrary.org/search.json?q=${req.body.url}`;
  fetch(urlString)
    .then((response) => response.json())
    .then((data) => {
      const bookArray = data.docs;
      let pictureURL;
      const resultArray = bookArray.map((obj) => {
        let id;
        if (obj.isbn && typeof obj.isbn === 'String') {
          id = obj.isbn;
          pictureURL = `https://covers.openlibrary.org/b/isbn/${id}-M.jpg`;
        } else if (obj.isbn && Array.isArray(obj.isbn)) {
          id = obj.isbn[0];
          pictureURL = `https://covers.openlibrary.org/b/isbn/${id}-M.jpg`;
        } else if (obj.cover_i && typeof obj.cover_i === 'String') {
          id = obj.cover_i;
          pictureURL = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
        } else if (obj.cover_i && Array.isArray(obj.cover_i)) {
          id = obj.cover_i[0];
          pictureURL = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
        } else {
          pictureURL = 'NO PICTURE';
        }
        const title = obj.title;
        // const author = obj.author_name
        let author;
        if (Array.isArray(obj.author_name)) {
          author = obj.author_name[0];
        } else {
          author = obj.author_name;
        }

bookController.findBook = (req, res, next) => {
  console.log('req.body.url: ', req.body.url);
  // req.body.url ==== "the+lord+of+the+rings"
  // fetch url = "http://openlibrary.org/search.json?q="
  // add the string from req.body into our url for the fetch request

  const urlString = `http://openlibrary.org/search.json?q=${req.body.url}`;
  fetch(urlString)
    .then((response) => response.json())
    .then((data) => {
      const bookArray = data.docs;
      let pictureURL;
      const resultArray = bookArray.map((obj) => {
        let id;
        if (obj.isbn && typeof obj.isbn === 'String') {
          id = obj.isbn;
          pictureURL = `https://covers.openlibrary.org/b/isbn/${id}-M.jpg`;
        } else if (obj.isbn && Array.isArray(obj.isbn)) {
          id = obj.isbn[0];
          pictureURL = `https://covers.openlibrary.org/b/isbn/${id}-M.jpg`;
        } else if (obj.cover_i && typeof obj.cover_i === 'String') {
          id = obj.cover_i;
          pictureURL = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
        } else if (obj.cover_i && Array.isArray(obj.cover_i)) {
          id = obj.cover_i[0];
          pictureURL = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
        } else {
          pictureURL = 'NO PICTURE';
        }
        const title = obj.title;
        // const author = obj.author_name
        let author;
        if (Array.isArray(obj.author_name)) {
          author = obj.author_name[0];
        } else {
          author = obj.author_name;
        }

        // console.log('DATA INSIDE MAP: ', coverID, title, author, pictureURL);
        return {
          title,
          author,
          pictureURL,
        };
      });
      res.locals.data = resultArray;
      return next();
    });
};

// original code
// bookController.findBook = (req, res, next) => {
//   if (!res.locals.initialEntry) {
//     const { name, author, genre_name, user_id } = req.body;
//     console.log(req.body);
//     res.locals.initialEntry = [name, author, genre_name, user_id];
//   }
//   //[title/name, author, genre(STRING), user_id]

//   const id = [res.locals.initialEntry[0], res.locals.initialEntry[1]];
//   //should I make it case insensitive?
//   console.log('we are in findBook before query: ', id);
//   const mySQL = 'SELECT b.* FROM books b WHERE b.name = $1 AND b.author = $2';

//   db.query(mySQL, id)
//     .then((data) => {
//       console.log('successfully found');
//       if (data.rows[0]) {
//         res.locals.foundBook = true;
//         res.locals.bookEntryID = data.rows[0];
//       }
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `Error in findBooks: ${err}`,
//         status: 400,
//         message: {
//           err: 'An error occurred. Check server logs for more details',
//         },
//       });
//     });
// };

//input: req.body with {[title/name, author, genre, (user_id)]}
//output: res.local.genre_id = {_id}
bookController.findGenre = (req, res, next) => {
  //I'm expecting userID to be in the reqBody for catalog purposes.
  //[title/name, author, genre(STRING), user_id]
  if (res.locals.foundBook) {
    // console.log('did we skip?');
    return next();
  }
  //the second value is for editting books...
  if (!res.locals.initialEntry) {
    const { book_id, name, author, genre_name, user_id } = req.body;
    res.locals.initialEntry = [book_id, name, author, genre_name, user_id];
  }
  //This may need some work

  const id =
    res.locals.initialEntry.length == 5
      ? [res.locals.initialEntry[3]]
      : [res.locals.initialEntry[2]];
  const mySQL = 'SELECT g._id FROM genre g WHERE g.genre = $1';
  db.query(mySQL, id)
    .then((data) => {
      res.locals.genre = data.rows[0];
      console.log('we are in findBooks');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in findGenre: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

//output: {_id, name, author, genre_id}
bookController.createBook = (req, res, next) => {
  if (res.locals.foundBook) {
    return next();
  }

  // res.locals initialEntry [ title/name, author, genre(STRING), user_id]
  //id = [title/name, author, genre(STRING), user_id, genre._id]
  //genre
  const arr = res.locals.initialEntry;
  const id = [arr[0], arr[1], res.locals.genre._id];

  //should be 1, 2, 3 as that should be title/name, genre, and genre_id
  //Should output book ID
  const mySQL = 'INSERT INTO books (name, author, genre) VALUES ($1, $2, $3)';
  console.log('in create book this is id: ', id);
  db.query(mySQL, id)
    .then((data) => {
      //I believe insert returns an item?
      console.log(data.rows[0]);
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createBooks: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

//We need user_id for this
// res.locals initialEntry [title/name, author, genre(STRING), user_id]
//id = [title/name, author, genre(STRING), user_id, bookEntryID._id]
bookController.createCatalogEntry = (req, res, next) => {
  const id =
    res.locals.initialEntry.length == 5
      ? [res.locals.initialEntry[4], res.locals.bookEntryID._id]
      : [res.locals.initialEntry[3], res.locals.bookEntryID._id];
  console.log(
    'before query in createCatalog: ',
    res.locals.initialEntry,
    res.locals.bookEntryID._id
  );
  //[ title/name, author, genre, user_id, book_id]
  const mySQL = 'INSERT INTO catalog (user_id, book_id) VALUES ($1, $2)';
  db.query(mySQL, id)
    .then((data) => {
      res.locals.user = {};
      res.locals.user._id = res.locals.initialEntry[3];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createCatalogEntry: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

bookController.deleteBook = (req, res, next) => {
  //INFO NEEDED [book_id, name, author, genre_id, user_id]
  const { book_id, user_id } = req.body;
  const id = [book_id, user_id];
  res.locals.user = { _id: user_id };
  const mySQL = 'DELETE FROM catalog c WHERE c.user_id = $2 AND c.book_id = $1';
  db.query(mySQL, id).then(() => {
    return next();
  });
};

bookController.editBook = (req, res, next) => {
  //expecting book info [NEWname, NEWauthor, NEWgenre(string), user_id, book._id]
  //PROBLEM THIS WILL EDIT THE BOOK ENTRIES (DO WE WANT THIS?)
  //id [NEWname, NEWauthor, NEWgenre_id, book._id]

  const arr = res.locals.initialEntry;
  console.log(arr);
  const id = [arr[1], arr[2], res.locals.genre._id, arr[0]];
  console.log('in Editbook this is the info: ', id);
  res.locals.user = { _id: arr[4] };
  const mySQL =
    'UPDATE books b SET name = $1, author = $2, genre = $3 WHERE b._id = $4';
  db.query(mySQL, id).then(() => {
    return next();
  });
};

module.exports = bookController;
