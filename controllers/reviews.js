const Product = require('../models/product');

async function create(req, res) {
  try {
    let product = await Product.findById(req.params.id);

    req.body.user = req.user;
    product.reviews.push(req.body);

    product = await product.save();

    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

async function edit(req, res) {
  try {
    const product = await Product.findOne({ review: req.params.id });

    // Filter out the index of the review that matches the id so that we have the review we have to edit
    let reviewId = product.reviews.findIndex(
      review => review._id.toString() === req.params.id
    );

    product.reviews[reviewId].title = req.body.title;
    product.reviews[reviewId].comment = req.body.comment;

    product.save();

    res.redirect(`/products/${product._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

async function deleteReview(req, res) {
  try {
    // Find product via a review that belongs to it
    const product = await Product.findOne({ review: req.params.id });

    // remove that review via its id
    await product.reviews.remove(req.params.id);

    await product.save();
    
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

module.exports = { create, delete: deleteReview, edit };
