const router = require('express').Router();

const controllers = require('../controllers/home.controller');
// const { authorize } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(controllers.index)

module.exports = router;