const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ValidationErr = require('../errors/validationErr');
const NotFoundErr = require('../errors/notFoundErr');
const ForbiddenErr = require('../errors/forbiddenErr');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(201).send({ data: movie });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationErr('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovieOnId = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundErr('Объект не найден');
      } else if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenErr('Доступ запрещен!');
      } else {
        Movie.deleteOne()
          .then(() => {
            res.send({ message: 'Фильм удален' });
          })
          .catch(next);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};
