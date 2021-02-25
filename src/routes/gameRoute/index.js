const router = require('express').Router();
const { gameController } = require('../../controllers');

router.get('/getAll', gameController.getAll);
router.get('/getByID/:id', gameController.getByID);
router.post('/create', gameController.create);
router.patch('/updateByID/:id', gameController.updateByID);

module.exports = router;
