const router = require("express").Router();
// const { createUser, login } = require("../controllers/users");
const { validateNewUser, validateLogin } = require("../middlewares/validation");

const usersRouter = require("./movies");
const cardsRouter = require("./users");

// router.post("/signin", validateLogin, login);
// router.post("/signup", validateNewUser, createUser);

// router.use(usersRouter, cardsRouter);

module.exports = router;
