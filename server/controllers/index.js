var express  = require('express')
  , router = express.Router();


router.get('/api', function (req, res, next) {
    res.render("common/index");
});

router.use('/api/tournament', require('./tournament'));

router.use('/api/event', require('./event'));

router.use('/api/team', require('./team'));

router.use('/api/match', require('./match'));

router.use('/api/player', require('./player'));

router.use('/api/auth', require('./auth'));



module.exports = router;
