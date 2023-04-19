const { Router } = require('express');
const router = Router();

let recipes = require('../Recipes');

router.get('/', (req, res) => {
    res.json(recipes);
})

router.post('/', (req, res) => {
    const newRecipe = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }
    recipes.push(newRecipe)
    res.json(recipes)
})

router.delete('/:id', (req, res) => {
    let{ id } = req.params
    let recipeToBeDeleted = recipes.find(recipe => recipe.id === id);

    if(recipeToBeDeleted) {
        res.json({
            message: "Recipe Deleted",
            recipes: recipes.filter(recipe => recipe.id !== id)
        })
    } else{
        res.status(404)
        .json(({message: `Recipe you're looking for doesn't exist`}))
    }
})

router.put('/:name', (req, res) => {
    let { name } = req.params
    let recipeToBeUpddated = recipes.find(recipe => recipe.name === name);

    if(recipeToBeUpddated){
        const updateRecipe = req.body;
        recipes.forEach(recipe => {
            if(recipe.name === req.params.name) {
                recipe.name = updateRecipe ? updateRecipe.name : recipe.name;
                recipe.id = updateRecipe ? updateRecipe.id : recipe.id;
                recipe.price = updateRecipe ? updateRecipe.price : recipe.price
                res.json({message: 'Recipe updated', recipes})
            }
        })
    } else {
        res.status(404)
        .json({message: `Recipe you are looking for ${req.params.name} doesn't exist`})
    }
    
})


module.exports = router;