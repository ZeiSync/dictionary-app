const router = require('express').Router();

const controllers = require('../controllers/word.controller');
const AuthMiddleware = require('../middlewares/auth');

router
  .route('/')
  .get(controllers.getAll);

router
  .route('/user')
  .get(AuthMiddleware.auth(), controllers.getUserWord);

module.exports = router;