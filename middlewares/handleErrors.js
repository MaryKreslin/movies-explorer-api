const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: (statusCode === 500) ? NOT_FOUND_ERROR_MESSAGE : message });
  next();
};

module.exports = handleErrors;
