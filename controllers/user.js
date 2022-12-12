const User = require('../models/user');
const Order = require('../models/order');

async function index(req, res) {
  try {
    const user = await User.findById(req.user);
    const orders = await Order.find({ user: user._id }).populate(
      'products.product'
    );
    console.log(user);
    console.log(orders);
    res.render('user/index', { user, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

// This goes here beacuse it's technically under /user/orders/:id route but we'll just render the order/show page since we're going to show the same thing
async function show(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    res.render('order/show', { order, isUserRoute: true });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

module.exports = {
  index,
  show,
};
