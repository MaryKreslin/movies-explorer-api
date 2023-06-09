const { Joi, celebrate } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const ValidateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
  }),
});

const ValidateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

module.exports = { ValidateMovie, ValidateMovieId };
