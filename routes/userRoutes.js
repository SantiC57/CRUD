const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.get('/usuarios/:id/recetas', userController.getUserRecipes);

    module.exports = router;
