const router = require('express').Router();

// const { ensureAuthenticated } = require('../middlewares/auth.middleware');

router.get('/', (_, res) => res.send('Ok'));

router.use('/word', require('./word.route'));
router.use('/home', require('./home.route'));

module.exports = router;