const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
});

module.exports = model('User', userModel);
