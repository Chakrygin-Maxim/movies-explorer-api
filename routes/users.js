const router = require("express").Router();
const auth = require("../middlewares/auth");

const { updateUserInfo, userInfo } = require("../controllers/users");
const { validateUserInfo } = require("../middlewares/validation");

// получение информации о пользователе
router.get("/users/me", auth, userInfo);

// обновление профиля
router.patch("/users/me", auth, validateUserInfo, updateUserInfo);

module.exports = router;
