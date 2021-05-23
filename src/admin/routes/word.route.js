const router = require('express').Router();

const controllers = require('../controllers/word.controller');

router
  .route('/')
  .get(controllers.index)
  .post(controllers.addNewWord);

router
  .route('/:id')
  .get(controllers.getDetail);

router
  .route('/:id/delete')
  .get(controllers.delete);

module.exports = router;