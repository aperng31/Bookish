//NEED MODEL
const db = require('../models/starWarsModels');

const userController = {};

userController.getAllUsers = () => {
  const mySQL = 'SELECT * FROM users';
};

userController.findUser = (req, res, next) => {
  // write code here
  const userLogin = Object.values(req.body);
  //assuming the req body will be in an array.
  const mySQL =
    'SELECT u.* from user u WHERE u.username = $1 AND u.password = $2';

  // const diffSQL = 'SELECT p.name AS Character, s.name FROM public.people p LEFT OUTER JOIN public.species s ON p.species_id = s._id';
  db.query(mySQL, userLogin)
    .then((data) => {
      res.locals.characters = data.rows;
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

userController.createUser = (req, res, next) => {
  // write code here
  const mySQL =
    'SELECT p.*, s.name AS species, h.name AS homeworld FROM public.people p LEFT JOIN public.species s on p.species_id = s._id JOIN public.planets h on p.homeworld_id = h._id';

  // const diffSQL = 'SELECT p.name AS Character, s.name FROM public.people p LEFT OUTER JOIN public.species s ON p.species_id = s._id';
  db.query(mySQL)
    .then((data) => {
      res.locals.characters = data.rows;
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
