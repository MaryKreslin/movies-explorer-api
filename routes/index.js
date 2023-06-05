const routes = require('express').Router();
const { login, createUser } = require('../controllers/user');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { ValidateSignin, ValidateSignup } = require('../middlewares/validateUser');
const { auth } = require('../middlewares/auth');
const NotFoundErr = require('../errors/notFoundErr');
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

routes.post('/signup', ValidateSignup, createUser);
routes.post('/signin', ValidateSignin, login);

routes.use('/users/me', auth, userRouter);

routes.use('/movies', auth, movieRouter);

routes.use('*', auth, (req, res, next) => {
  const err = new NotFoundErr(NOT_FOUND_ERROR_MESSAGE);
  next(err);
});

module.exports = routes;
