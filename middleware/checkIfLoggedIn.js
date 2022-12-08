function checkIfLoggedIn(req, res, next) {
  if (!req.user) {
    return res.redirect('/auth/google');
  }

  next();
}

module.exports = checkIfLoggedIn;
