const router = require('express').Router();

const controllers = require('../controllers/home.controller');

router
  .route('/')
  .get(controllers.index)

module.exports = router;