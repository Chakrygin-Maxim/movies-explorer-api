const { celebrate, Joi, errors } = require('celebrate'); //* модуль для валидации данных от пользователя до запуска контроллера

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().integer(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    //* валидируем тело запроса
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_\\+.~#?&//=]*)/,
      ),
    trailer: Joi.string()
      .required()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_\\+.~#?&//=]*)/,
      ),
    thumbnail: Joi.string()
      .required()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_\\+.~#?&//=]*)/,
      ),
    movieId: Joi.number().integer(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateId,
  validateUserInfo,
  validateMovie,
  validateNewUser,
  validateLogin,
  errors,
};
