const express = require('express');
const path = require('path');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');

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


  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('admin', adminStrategy);

  app.use('/', routes);
  app.use('/admin', adminRoutes);

  app.use('/healthcheck', (req, res, next) => res.status(httpStatus.OK).end());

  return app;
};