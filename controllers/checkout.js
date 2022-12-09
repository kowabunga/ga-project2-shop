const Cart = require('../models/cart');
const Order = require('../models/order');

async function index(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'products.product',
    });

    let total = 0;
    cart.products.forEach(
      product => (total += product.product.price * product.count)
    );

    res.render('checkout/index', { cart, total });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

async function createOrder(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'products.product',
    });

    let order = {
      user: req.user._id,
      orderNumber: Math.floor(Math.random() * 39483928),
      products: cart.products,
    };

    order = await Order.create(order);

    // After the order is complete, delete the items from the user's cart!
    await Cart.deleteOne({ user: req.user._id });

    res.redirect(`/orders/${order._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

module.exports = { index, create: createOrder };
