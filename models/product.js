const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    // This will replace the "date" property on the Review schemaW
    timestamps: true,
  }
);

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: imageSchema,
  reviews: [reviewSchema],
});

module.exports = model('Product', productSchema);
