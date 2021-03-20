const { textErrorDefault } = require('../config');

module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500 ? textErrorDefault : message,
  });

  next();
};
