const router = require('express').Router();
const orderController = require('../controllers/orders');

router.get('/:id', orderController.show);

module.exports = router;
