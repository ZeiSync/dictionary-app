const router = require('express').Router();

const controllers = require('../controllers/word.controller');

router
  .route('/')
  .get(controllers.index)

module.exports = router;