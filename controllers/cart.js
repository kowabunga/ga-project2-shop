const Cart = require('../models/cart');

async function index(req, res) {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'products.product',
  });

  //   If there's nothing in the cart, just render the cart page without anything on it
  if (!cart) return res.render('cart/index', { cart: null });

  //   We're going to take all the individual products and create a "hashmap" of them so that we know the counts of each product!
  let total = 0;
  cart.products.forEach(
    product => (total += product.product.price * product.count)
  );

  //   res.send(cart);
  res.render('cart/index', { cart, total });
}

async function addToCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('products');

    // If cart does not exist for user, create the user's cart and save in db
    if (!cart) {
      console.log('this place');
      req.body.user = req.user._id;
      req.body.products = {
        product: req.body.productId,
      };
      cart = await Cart.create(req.body);
      return res.redirect(`/products/${req.body.productId}`);
    }

    // if cart already exists and is found, just update the cart
    // also have to check if its already in the cart. If it is, just update it!
    if (
      cart.products.filter(product => {
        console.log(product.product.toString());
        console.log(req.body.productId);
        return product.product.toString() === req.body.productId;
      }).length >= 1
    ) {
      console.log('here');
      for (let product of cart.products) {
        //For easy comparison, convert the mongoose _id from ObjectId to a string
        let mongoStr = product.product.toString();
        let reqBdyStr = req.body.productId;

        //   If this is the same object, update the count on the product subdocument
        if (mongoStr === reqBdyStr) {
          product.count += 1;
        }
      }
    } else {
      console.log('or there');

      cart.products.push({
        product: req.body.productId,
      });
    }

    await cart.save();

    res.redirect(`/products/${req.body.productId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error, check console');
  }
}

async function update(req, res) {
  try {
    const id = req.params.id || req.body.paramId;
    const cart = await Cart.findById(req.params.id).populate('products');

    for (let product of cart.products) {
      //For easy comparison, convert the mongoose _id from ObjectId to a string
      let mongoStr = product.product.toString();
      let reqBdyStr = req.body.productId;

      //   If this is the same object, update the count on the product subdocument
      if (mongoStr === reqBdyStr) {
        product.count = req.body.quantity;
      }
    }
    await cart.save();

    res.redirect('/cart');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error, check console');
  }
}

module.exports = { index, addToCart, update };
