//NEED MODEL
const db = require('../models/scratch_model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.getAllUsers = () => {
  const mySQL = 'SELECT * FROM users';
};

userController.findUser = (req, res, next) => {
  // write code here
  //[username, password]
  const { username, password } = req.body;
  const userLogin = [username];
  //assuming the req body will be in an array.
  const mySQL = 'SELECT u.* from users u WHERE u.username = $1';
  db.query(mySQL, userLogin)
    .then((data) => {
      res.locals.user = data.rows[0];
      console.log('this is user data in login: ', res.locals.user);
      if (!res.locals.user) {
        return next({
          log: `failed to find user`,
          status: 400,
          message: {
            err: 'Wrong username or password',
          },
        });
      }
      bcrypt.compare(
        password,
        res.locals.user.password,
        function (err, result) {
          if (result) {
            return next();
          }

          return next({
            log: `wrong password`,
            status: 400,
            message: {
              err: 'Wrong username or password',
            },
          });
        }
      );
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
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user[2], salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      console.log(hash);
      user[2] = hash;
    });
  });
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
