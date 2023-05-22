const routes = require('express').Router();
const { login, createUser } = require('../controllers/user');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { ValidateSignin, ValidateSignup } = require('../middlewares/validateUser');
const { auth } = require('../middlewares/auth');

routes.post('/signup', ValidateSignup, createUser);
routes.post('/signin', ValidateSignin, login);

routes.use('/users/me', auth, userRouter);

routes.use('/movies', auth, movieRouter);

module.exports = routes;
