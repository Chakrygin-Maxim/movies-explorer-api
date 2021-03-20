const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { textAuthError } = require('../config');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(textAuthError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AuthError(textAuthError);
  }

  req.user = payload; //* записали пейлоуд в объект запроса

  next(); //* пропустили запрос дальше
};
