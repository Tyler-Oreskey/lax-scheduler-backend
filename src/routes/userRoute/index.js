const router = require('express').Router();
const { userController } = require('../../controllers');

router.get('/getAll', userController.getAll);
router.get('/getByID/:id', userController.getByID);
router.post('/create', userController.create);
router.post('/login', userController.login);
router.patch('/updateByID/:id', userController.updateByID);

module.exports = router;
