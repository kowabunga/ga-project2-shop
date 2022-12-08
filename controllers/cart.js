const Cart = require('../models/cart');

async function index(req, res) {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'products',
    '-reviews'
  );
  //   We're going to take all the individual products and create a "hashmap" of them so that we know the counts of each product!
  const cartCounts = {};
  let total = 0;
  cart.products.forEach(product => {
    total += product.price;
    if (!cartCounts[product._id]) {
      cartCounts[product._id] = {
        count: 1,
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      };
    } else {
      cartCounts[product._id].count++;
    }
  });

  res.render('cart/index', { cart: cartCounts, total });
}

// async function create(req, res) {}

async function addToCart(req, res) {
  // Cart functionality currently requires a user to be logged in
  // If user not logged in, redirect to login page
  if (!req.user) {
    return res.redirect('/auth/google');
  }

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart does not exist for user, create the user's cart and save in db
    if (!cart) {
      req.body.user = req.user._id;
      req.body.products = [req.body.products];
      cart = await Cart.create(req.body);
      return res.send('Added to cart');
    }

    // if cart already exists and is found, just update the cart
    cart.products.push(req.body.products);
    await cart.save();

    res.redirect(`/products/${req.body.products}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error, check console');
  }
}

module.exports = { index, update: addToCart };
