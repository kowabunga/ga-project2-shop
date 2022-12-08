const router = require('express').Router();
const cartController = require('../controllers/cart');

router.get('/', cartController.index);

router.post('/', cartController.update);

module.exports = router;
