const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { validateNewUser, validateLogin } = require("../middlewares/validation");

const moviesRouter = require("./movies");
const usersRouter = require("./users");

router.post("/signin", validateLogin, login);
router.post("/signup", validateNewUser, createUser);

router.use(usersRouter, moviesRouter);

module.exports = router;
