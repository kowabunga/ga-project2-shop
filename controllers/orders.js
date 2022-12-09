const Order = require('../models/order');

async function show(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate(
      'products.product'
    );

    let total = 0;
    order.products.forEach(
      product => (total += product.product.price * product.count)
    );

    res.render('orders/show', { order, total });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, check the terminal...');
  }
}

module.exports = { show };
