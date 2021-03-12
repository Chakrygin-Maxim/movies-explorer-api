const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require("../controllers/movies");
const { validateMovie, validateId } = require("../middlewares/validation");

// получение фильмов
router.get("/movies", auth, getMovies);

// создаёт фильм
router.post("/movies", auth, validateMovie, createMovies);

// удаляет сохранённый фильм по _id
router.delete("/movies/:movieId", auth, validateId, deleteMovies);

module.exports = router;
