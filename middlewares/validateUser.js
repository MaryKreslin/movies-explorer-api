const { Joi, celebrate } = require('celebrate');

const { PASSWORD_REGEX } = require('../utils/constants');

const ValidateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(PASSWORD_REGEX),
    name: Joi.string().min(2).max(30),
  }),
});

const ValidateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(PASSWORD_REGEX),
  }),
});

const ValidateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  ValidateSignin,
  ValidateSignup,
  ValidateUser,
};
