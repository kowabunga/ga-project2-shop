const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const cartModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
  },
});

module.exports = model('Cart', cartModel);
