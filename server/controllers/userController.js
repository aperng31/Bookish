//NEED MODEL
const db = require('../models/scratch_model.js');

const userController = {};

userController.getAllUsers = () => {
  const mySQL = 'SELECT * FROM users';
};

userController.findUser = (req, res, next) => {
  // write code here
  //[username, password]
  const userLogin = Object.values(req.body);
  //assuming the req body will be in an array.
  const mySQL =
    'SELECT u.* from user u WHERE u.username = $1 AND u.password = $2';

  db.query(mySQL, userLogin)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userLogin: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

userController.createUser = (req, res, next) => {
  // write code here
  //input - req.body --> [name, username, password]
  const user = Object.values(req.body);
  const mySQL =
    'INSERT INTO users (name, username, password) OUTPUT Inserted._id VALUES ($1, $2, $3)';

  db.query(mySQL, user)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in starwarsController.getCharacters: ${err}`,
        status: 400,
        message: {
          err: 'An error occurred. Check server logs for more details',
        },
      });
    });
};

module.exports = userController;
