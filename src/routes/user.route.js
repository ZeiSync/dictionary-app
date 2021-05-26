const router = require('express').Router();

const controllers = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth');

router
  .route('/')
  .get(AuthMiddleware.auth(), controllers.getUserInfor);

router
  .route('/update')
  .put(AuthMiddleware.auth(), controllers.updateUserInfor);

router
  .route('/add/:id')
  .get(AuthMiddleware.auth(), controllers.addWordToUser);

router
  .route('/remove/:id')
  .get(AuthMiddleware.auth(), controllers.removeWordToUser);


module.exports = router;