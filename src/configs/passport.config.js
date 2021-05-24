const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

const adminStrategyCallback = async (email, password, done) => {
  const admin = await User.findOne({ email }).lean();
  if (!admin) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  if (!admin.isAdmin) {
    return done(null, false, { message: 'User isn\'t Admin' });
  }
  const isCorrectPassword = await bcrypt.compare(password, admin.password);
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
