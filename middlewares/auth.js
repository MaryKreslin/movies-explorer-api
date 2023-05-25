const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorizedErr');
const {
  UNAUTORIZED_ERROR_MESSAGE,
  DEV_JWT_KEY,
} = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr(UNAUTORIZED_ERROR_MESSAGE));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_KEY);
  } catch (err) {
    next(new UnauthorizedErr(UNAUTORIZED_ERROR_MESSAGE));
    return;
  }
  req.user = payload;
  next();
};
