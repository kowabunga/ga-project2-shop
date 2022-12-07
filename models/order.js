const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const Product = require('./product');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderNumber: {
    default: Math.floor(Math.random() * 999999),
  },
  products: {
    required: true,
    type: [Product],
  },
});

module.exports = model('Order', orderSchema);
