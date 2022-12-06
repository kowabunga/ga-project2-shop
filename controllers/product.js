function index(req, res) {
  console.log(req.user);
  res.render('products/index');
}

module.exports = { index };
