exports.requireAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
};

exports.requireAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.is_admin) {
      return next();
    }
  }
  res.sendStatus(401);
};
