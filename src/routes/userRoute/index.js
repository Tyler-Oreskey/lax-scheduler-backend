const router = require('express').Router();
const { userController } = require('../../controllers');

router.get('/', userController.get);
router.get('/:id', userController.getByID);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.post('/login', userController.login);

module.exports = router;
