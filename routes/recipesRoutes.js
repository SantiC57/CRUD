const express = require('express');
const router = express.Router();
const recipesController = require('../controller/recipesController');

router.get('/recetas', recipesController.getRecipes);
router.get('/recetas/:id', recipesController.getRecipeById);
router.post('/recetas', recipesController.createRecipe);
router.put('/recetas/:id', recipesController.updateRecipe);
router.delete('/recetas/:id', recipesController.deleteRecipe);

module.exports = router;