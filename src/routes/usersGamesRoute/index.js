const router = require('express').Router();
const { usersGamesController } = require('../../controllers');

router.get('/getGamesByUserID/:id', usersGamesController.getGamesByUserID);
router.post('/addUserToGame', usersGamesController.addUserToGame);
router.delete('/removeUserFromGame', usersGamesController.removeUserFromGame);

module.exports = router;
