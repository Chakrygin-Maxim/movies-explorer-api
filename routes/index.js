const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const {
  validateNewUser,
  validateLogin,
  errors,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { textNotFoundError } = require('../config');

const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateNewUser, createUser);

router.use(usersRouter, moviesRouter);

// заглушка других запросов на несуществующий адрес
router.use('*', () => {
  throw new NotFoundError(textNotFoundError);
});

router.use(errors());
module.exports = router;
