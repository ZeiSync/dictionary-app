const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).lean();
  return done(null, user);
});

const adminStrategyCallback = async (email, password, done) => {
  const admin = await User.findOne({ email, isAdmin: true }).lean();
  if (!admin) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  const isCorrectPassword = bcrypt.compareSync(password, admin.password);
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
