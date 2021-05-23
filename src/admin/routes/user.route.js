const router = require('express').Router();

const controllers = require('../controllers/user.controller');

router
  .route('/')
  .get(controllers.index)

router
  .route('/:id')
  .get(controllers.getDetail)
  .post(controllers.updateUser);

router
  .route('/:id/delete')
  .get(controllers.delete);

module.exports = router;