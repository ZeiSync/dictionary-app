const router = require('express').Router();

const controllers = require('../controllers/word.controller');

router
  .route('/')
  .get(controllers.index)
  .post(controllers.addNewWord);

router
  .route('/:id')
  .get(controllers.getDetail)
  .post(controllers.updateWord);

router
  .route('/:id/delete')
  .get(controllers.delete);

router
  .route('/:id/delete-mean/:meanId')
  .get(controllers.deleteMean);

module.exports = router;