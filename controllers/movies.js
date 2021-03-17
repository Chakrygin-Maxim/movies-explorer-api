const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

function getMovies(req, res, next) {
  Movie.find({})
    .then((muvies) => res.send(muvies))
    .catch(next);
}

function createMovies(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      const data = movie;
      data.owner = undefined;
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка валидации данных');
      } else {
        next(err);
      }
    })
    .catch(next);
}

function deleteMovies(req, res, next) {
  const { movieId } = req.params;

  Movie.findOne({ movieId })
    .then((searchMovie) => {
      if (!searchMovie) {
        throw new NotFoundError('Фильм не найден');
      }
      Movie.findByIdAndDelete(searchMovie._id).then((movie) => {
        const data = movie;
        data.owner = undefined;

        res.send(data);
      });
    })
    .catch(next);
}

module.exports = { getMovies, createMovies, deleteMovies };
