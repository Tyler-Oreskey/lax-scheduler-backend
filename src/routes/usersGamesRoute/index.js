const router = require('express').Router();
const { usersGamesController } = require('../../controllers');

router.get('/:user_id', usersGamesController.getGamesByUserID);
router.post('/:game_id', usersGamesController.addUserToGameByID);
router.delete('/:game_id', usersGamesController.deleteUserFromGameByID);

module.exports = router;
