const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // const user = await AdminUser.findById(id);
  const user = null;
  return done(null, user);
});

const adminStrategyCallback = async (email, password, done) => {
  const admin = null;
  // const admin = await AdminUser.findOne({ email });
  if (!admin) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  const isCorrectPassword = await admin.checkIsCorrectPassword({ password });
  if (!isCorrectPassword) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, admin);
};

exports.adminStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  adminStrategyCallback,
);
