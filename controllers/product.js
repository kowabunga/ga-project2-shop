const Product = require('../models/product');
async function index(req, res) {
  const products = await Product.find({});
  res.render('products/index', { products });
}

async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    res.render('products/show', { product });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Something went wrong, try again...');
  }
}

async function create(req, res) {
  try {
    const product = await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Something went wrong, try again...');
  }
}

module.exports = { index, create, show };
