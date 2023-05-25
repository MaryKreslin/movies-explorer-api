require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationErr = require('../errors/validationErr');
const NotFoundErr = require('../errors/notFoundErr');
const ConflictErr = require('../errors/conflictErr');
const {
  NOT_FOUND_ERROR_MESSAGE,
  VALIDATION_ERROR__MESSAGE,
  CONFLICT_ERROR_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new ValidationErr(VALIDATION_ERROR__MESSAGE));
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictErr(CONFLICT_ERROR_MESSAGE));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new ValidationErr(VALIDATION_ERROR__MESSAGE));
      } else {
        next(error);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE);
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictErr(CONFLICT_ERROR_MESSAGE));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new ValidationErr(VALIDATION_ERROR__MESSAGE));
      } else {
        next(error);
      }
    });
};
