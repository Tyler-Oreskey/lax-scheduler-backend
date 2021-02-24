const router = require('express').Router();

router.use('/game', require('./game'));
router.use('/user', require('./user'));

module.exports = router;
