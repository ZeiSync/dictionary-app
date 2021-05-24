const router = require('express').Router();

const controllers = require('../controllers/auth.controller');

router
  .route('/login')
  .post(controllers.login);

router
  .route('/register')
  .post(controllers.register);

module.exports = router;