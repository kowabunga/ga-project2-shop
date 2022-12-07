const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/', productController.index);
router.get('/:id', productController.show);

router.post('/', productController.create);

module.exports = router;
