const Movie = require("../models/movie");
const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const ForbiddenError = require("../errors/ForbiddenError");

function getMovies(req, res, next) {
  Movie.find({})
    .populate("owner")
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
      res.send(movie);
    })
    .catch((err) => {
      throw new ValidationError(err.message);
    })
    .catch(next);
}

function deleteMovies(req, res, next) {
  const currentUserId = req.user._id;

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError("Фильм не найден");
      }
      if (movie.owner.toString() !== currentUserId) {
        throw new ForbiddenError("Недостаточно прав на удаление фильма");
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
}

module.exports = { getMovies, createMovies, deleteMovies };
