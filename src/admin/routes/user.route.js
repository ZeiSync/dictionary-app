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

router
  .route('/:id/delete-word/:wordId')
  .get(controllers.removeWord);

module.exports = router;