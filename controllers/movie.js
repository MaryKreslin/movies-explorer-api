const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ValidationErr = require('../errors/validationErr');
const NotFoundErr = require('../errors/notFoundErr');
const ForbiddenErr = require('../errors/forbiddenErr');
const {
  VALIDATION_ERROR__MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_DELETE_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

module.exports.createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ owner, ...req.body });
    res.status(201).send({ data: movie });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationErr(VALIDATION_ERROR__MESSAGE));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovieOnId = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE);
      } else if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenErr(FORBIDDEN_DELETE_MESSAGE);
      } else {
        Movie.deleteOne({ _id: req.params.id }, { new: true })
          .then(() => {
            res.send({ message: 'Фильм удален' });
          })
          .catch(next);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new ValidationErr(VALIDATION_ERROR__MESSAGE));
      } else {
        next(error);
      }
    });
};
