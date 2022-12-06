const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/', productController.index);

module.exports = router;
