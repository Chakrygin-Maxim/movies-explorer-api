const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //* модуль для создания jwt-токенов
const User = require('../models/user');
const { JWT_SECRET, JWT_TTL } = require('../config');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((passwordHash) => User.create({ name, email, passwordHash }))
    .then((data) => {
      res.send(data);
    })

    .catch((error) => {
      if (error.name === 'MongoError' || error.code === 11000) {
        throw new ConflictError(error.message);
      }

      throw new ConflictError(error.message);
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  User.findById(req.user._id)

    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send(user);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      throw new NotFoundError('Пользователь не найден!');
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    // eslint-disable-next-line comma-dangle
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send(user);
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })

    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_TTL,
      });

      res.status(200).send({ token });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })

    .catch(next);
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
