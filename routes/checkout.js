const router = require('express').Router();
const checkoutController = require('../controllers/checkout');
const checkIfLoggedIn = require('../middleware/checkIfLoggedIn');

router.get('/', checkIfLoggedIn, checkoutController.index);

router.post('/', checkIfLoggedIn, checkoutController.create);

module.exports = router;
