const router = require('express').Router();
const userController = require('../controllers/user');
const checkIfLoggedIn = require('../middleware/checkIfLoggedIn');

router.get('/', checkIfLoggedIn, userController.index);
router.get('/orders/:id',checkIfLoggedIn,userController.show)

module.exports = router;
