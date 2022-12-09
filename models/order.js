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

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
  products: {
    required: true,
    type: [productCountModel],
  },
});

module.exports = model('Order', orderSchema);
