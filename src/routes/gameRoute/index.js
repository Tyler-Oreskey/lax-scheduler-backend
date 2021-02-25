const router = require('express').Router();
const { gameController } = require('../../controllers');

router.get('/', gameController.get);
router.get('/:id', gameController.getByID);
router.post('/', gameController.create);
router.patch('/:id', gameController.update);

module.exports = router;
