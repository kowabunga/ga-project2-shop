const Cart = require('../models/cart');

async function index(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
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
        return product.product.equals(req.body.productId);
      }).length >= 1
    ) {
      for (let product of cart.products) {
        //   If this is the same object, update the count on the product subdocument
        if (product.product.equals(req.body.productId)) {
          product.count += 1;
        }
      }
    } else {
      // If the item is not in the cart already, let's add it
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

async function updateCartItem(req, res) {
  try {
    const cart = await Cart.findById(req.params.id).populate('products');

    for (let product of cart.products) {
      // Make sure product is the one we're looking for to update the count in the cart
      if (product.product.equals(req.body.productId)) {
        product.count = req.body.quantity;
      }

      // If a product count is equal to 0, delete it from the cart
      if (product.count === 0) {
        cart.products.remove(product._id);
      }
    }
    await cart.save();

    res.redirect('/cart');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error, check console');
  }
}

module.exports = { index, new: addToCart, update: updateCartItem };
