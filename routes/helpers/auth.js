exports.requireLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  const err = new Error('You must log in to view this page.');
  console.log(err);
  err.status = 401;

  return res.redirect('/login');
};
