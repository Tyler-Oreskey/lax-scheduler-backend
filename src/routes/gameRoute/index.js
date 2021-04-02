const router = require('express').Router();
const { gameController } = require('../../controllers');

router.get('/', gameController.getAll);
router.get('/:id', gameController.getByID);
router.post('/', gameController.create);
router.patch('/:id', gameController.updateByID);

module.exports = router;
