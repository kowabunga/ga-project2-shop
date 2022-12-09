const router = require('express').Router();
const cartController = require('../controllers/cart');
const checkIfLoggedIn = require('../middleware/checkIfLoggedIn');

router.get('/', checkIfLoggedIn, cartController.index);

router.post('/', checkIfLoggedIn, cartController.new);

router.put('/:id', checkIfLoggedIn, cartController.update);

module.exports = router;
