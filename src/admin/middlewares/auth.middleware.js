const passport = require('passport');

exports.authorize = () => passport.authenticate('admin', {
  successRedirect: '/admin/word',
  failureRedirect: '/admin/auth/login',
});

exports.ensureAuthenticated = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/admin/auth/login');
};