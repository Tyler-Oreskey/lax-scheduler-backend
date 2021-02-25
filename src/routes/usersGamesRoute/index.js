const router = require('express').Router();
const { usersGamesController } = require('../../controllers');

router.get('/:user_id', usersGamesController.getByID);
router.post('/:game_id', usersGamesController.create);
router.delete('/:game_id', usersGamesController.delete);

module.exports = router;
