const router = require('express').Router();

const controllers = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth');

router
  .route('/')
  .get(AuthMiddleware.auth(), controllers.getUserInfor);

router
  .router('/update')
  .put(AuthMiddleware.auth(), controllers.updateUserInfor);

router
  .router('/add/:id')
  .get(AuthMiddleware.auth(), controllers.addWordToUser);

router
  .router('/remove/:id')
  .get(AuthMiddleware.auth(), controllers.removeWord);


module.exports = router;