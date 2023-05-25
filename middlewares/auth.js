const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorizedErr');
const {
  UNAUTORIZED_ERROR_MESSAGE,
  UNATHORIZES_WRONG_EMAIL_PASSWORD_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr(UNAUTORIZED_ERROR_MESSAGE));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedErr(UNATHORIZES_WRONG_EMAIL_PASSWORD_MESSAGE));
    return;
  }
  req.user = payload;
  next();
};
