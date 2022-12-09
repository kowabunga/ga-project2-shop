const { Schema, model } = require('mongoose');

const productCountModel = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  count: {
    type: Number,
    default: 1,
    min: 0,
  },
});

const cartModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [productCountModel],
});

module.exports = model('Cart', cartModel);
