
const router = require('express').Router();

// const { ensureAuthenticated } = require('../middlewares/auth.middleware');

router.get('/', (_, res) => res.redirect('/word'));

router.use('/auth', require('./auth.route'));
router.use('/word', require('./word.route'));
router.use('/user', require('./user.route'));

module.exports = router;