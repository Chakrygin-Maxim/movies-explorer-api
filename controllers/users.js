const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //* модуль для создания jwt-токенов
const User = require('../models/user');
const { JWT_SECRET, JWT_TTL } = require('../config');
const ConflictError = require('../errors/ConflictError');
const { textUserAlreadyCreate } = require('../config');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((data) => {
      const user = data;
      user.password = undefined;
      res.send(user);
    })

    .catch((error) => {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new ConflictError(textUserAlreadyCreate);
      } else {
        next(error);
      }
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  User.findById(req.user._id)

    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
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
    .catch(next);
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
