
const router = require('express').Router();

// const { ensureAuthenticated } = require('../middlewares/auth.middleware');

router.get('/', (_, res) => res.redirect('/home'));

router.use('/home', require('./home.route'));

module.exports = router;