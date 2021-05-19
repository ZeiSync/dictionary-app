const router = require('express').Router();

const controllers = require('../controllers/auth.controller');
const { authorize } = require('../middlewares/auth.middleware');

router
  .route('/login')
  .get(controllers.login)
  .post(authorize());

module.exports = router;