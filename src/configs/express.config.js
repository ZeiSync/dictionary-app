const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const httpStatus = require('http-status');
const { mongoUri, secret } = require('./var');

const { adminStrategy } = require('./passport.config');
const routes = require('../routes/index');
const adminRoutes = require('../admin/routes/index');

const app = express();

exports.createApp = () => {

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  app.use(cors());
  app.use(
    session({
      secret,
      saveUninitialized: true,
      resave: true,
      store: MongoStore.create({
        mongoUrl: mongoUri,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use('admin', adminStrategy);

  app.get('/', (_, res) => res.redirect('/admin'));
  app.use('/api', routes);
  app.use('/admin', adminRoutes);

  app.use('/healthcheck', (req, res, next) => res.status(httpStatus.OK).end());

  return app;
};