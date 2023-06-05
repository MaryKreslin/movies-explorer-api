const router = require('express').Router();
const { getMovies, createMovie, deleteMovieOnId } = require('../controllers/movie');
const { ValidateMovie, ValidateMovieId } = require('../middlewares/validateMovie');

router.get('/', getMovies);
router.post('/', ValidateMovie, createMovie);
router.delete('/:id', ValidateMovieId, deleteMovieOnId);

module.exports = router;
