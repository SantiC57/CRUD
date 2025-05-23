const Recipes = require('../models/recipes');


exports.getRecipes = async (req,res) => {
    try {
        const recipe = await Recipes.findAll();
        res.status(200).json(recipe);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.getRecipeById = async (req,res) => {
    try {
        const recipe = await Recipes.findByPk(req.params.id)
        if (!recipe)
            return res.status(404).json({message: 'Receta no encontrada'});
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

exports.createRecipe = async (req, res) => {
    const {titulo, preparacion, ingredientes, imagen, tiempo,categoria,coccion,usuarioId} = req.body;
    try {
        const recipes = await Recipes.create({
            titulo,
            preparacion,
            ingredientes,
            imagen,
            tiempo,
            categoria,
            coccion,
            usuarioId
        });
        res.status(201).json(recipes);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

exports.updateRecipe = async (req, res) => {
    const {titulo, preparacion, ingredientes, imagen, tiempo,categoria,coccion,usuarioId} = req.body;
    try {
        const recipe = await Recipes.findByPk(req.params.id);
        if (!recipe)
            return res.status(404).json({message: 'Receta no encontrada'});
   
        await recipe.update(req.body);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipes = await Recipes.findByPk(req.params.id);
        if (!recipes)
            return res.status(404).json({message: 'Receta no encontrada'});
        recipes.destroy();
        res.status(200).json({message: 'Receta eliminada'}); 
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};