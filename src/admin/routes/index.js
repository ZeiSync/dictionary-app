const router = require('express').Router();

const { ensureAuthenticated } = require('../middlewares/auth.middleware');

router.get('/', (_, res) => res.redirect('/admin/word'));

router.use('/auth', require('./auth.route'));
router.use('/word', ensureAuthenticated(), require('./word.route'));
router.use('/user', ensureAuthenticated(), require('./user.route'));

module.exports = router;