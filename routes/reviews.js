const router = require('express').Router();
const reviewController = require('../controllers/reviews');

router.post('/products/:id/review', reviewController.create);

router.put('/reviews/:id', reviewController.edit);

router.delete('/reviews/:id', reviewController.delete);

module.exports = router;
