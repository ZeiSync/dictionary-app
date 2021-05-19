const express = require('express');
const path = require('path');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');

const { adminStrategy } = require('./passport.config');

const app = express();

exports.createApp = () => {

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../admin/views'));
  app.use(express.static(path.join(__dirname, '../admin/public')));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  app.use(cors());


  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('admin', adminStrategy);

  app.get('/', (_, res) => res.status(httpStatus.OK).json('OK'));

  app.use('/healthcheck', (req, res, next) => res.status(httpStatus.OK).end());

  return app;
};