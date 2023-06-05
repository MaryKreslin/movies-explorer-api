const router = require('express').Router();
const { getCurrentUser, patchUser } = require('../controllers/user');
const { ValidateUser } = require('../middlewares/validateUser');

router.get('/', getCurrentUser);
router.patch('/', ValidateUser, patchUser);

module.exports = router;
