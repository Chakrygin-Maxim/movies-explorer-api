const validator = require("validator");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} невалидная электронная почта!`,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

function handleFindUserByCredentials(email, password) {
  //* попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select("+password") //* this — это модель User
    .then((user) => {
      //* если не нашёлся — отклоняем промис создав ошибку
      if (!user) {
        return Promise.reject(new Error("Неправильная почта"));
      }

      //* если нашёлся — сравниваем хеши паролей
      return bcrypt.compare(password, user.password).then((matched) => {
        //* если хеши не совпали - отклоняем промис
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return user; // теперь user доступен
      });
    });
}

userSchema.statics.findUserByCredentials = handleFindUserByCredentials;

module.exports = mongoose.model("user", userSchema);
